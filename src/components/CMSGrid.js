import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton,CircularProgress } from "@mui/material";
import { helper } from "../utils/helper";
import { EditModal } from "./EditModal";
import DeleteDialog from "./DeleteDialog";
import { SearchBar } from "./SearchBar";

const { REACT_APP_DATABASE_URL = "http://localhost" } = process.env

function createData(
    id,
    first_name,
    last_name,
    delivery_address,
    created_date,
  ) {
    const {  billing_address = "", physical_address ="" } = delivery_address
    return { id, first_name, last_name, billing_address, physical_address, created_date };
  }
  

export const CMSGrid = () =>{

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [rows, setRows] = useState([])
    const [filterData, setFilterData] = useState([])

    const [loaded, setLoaded] = useState(false)
    const [searchValue, setSearchValue] = useState("")

    const [{showEdit, showDelete, edit_data, delete_data}, setShowModal] = useState({
        showEdit : false,
        showDelete: false,
        edit_data : {},
        delete_data : {}
    })
    const [{confirm_delete, confirm_edit}, setConfirmModify] = useState({
        confirm_delete: false,
        confirm_edit: false
    })

    
  const columns = [
    { id: 'first_name', label: 'First Name', minWidth: 100, align: 'center', fontSize: "20px" },
    { id: 'last_name', label: 'Last Name', minWidth: 100 , align: 'center',fontSize: "20px" },
    {
      id: 'billing_address',
      label: 'Billing Address',
      minWidth: 130,
      align: 'center',
      fontSize: "20px" 
    },
    {
      id: 'physical_address',
      label: 'Physical Address',
      minWidth: 170,
      align: 'center',
      fontSize: "20px" 
    },
    {
      id: 'created_date',
      label: 'Created Date',
      minWidth: 130,
      align: 'center',
      fontSize: "20px" 
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 70,
        align: 'center',
        fontSize: "20px" 
      },
  ];

 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const handleEditButton = (data)=>{
        setShowModal((prev)=> {
             return {
            ...prev,
            showEdit: true,
            edit_data : data
        }})
      }

      const handleDeleteButton = (data)=>{
        setShowModal((prev)=> {
            return {
           ...prev,
           showDelete: true,
           delete_data: data
       }})
      }

      const handleSearch = (e)=>{
        const { value } = e.target
        setSearchValue(value)
        const compare_data = rows.map(({
          id,first_name, last_name, billing_address, physical_address,
          created_date
        })=>{
          const stringified_data = JSON.stringify(
            {
              first_name,
              last_name,
              physical_address,
              billing_address,
              created_date: new Date(created_date).toDateString()
            }
          ).toLowerCase()
          return {
            id,
            stringified_data
          }
          
        })
        const matched_data_ids = compare_data.filter((data)=>data.stringified_data.includes(value.toLowerCase())).map(({id})=> id)
        const filtered_data = rows.filter((row)=> matched_data_ids.includes(row.id))
        setFilterData(filtered_data)
        setPage(0)
      }

      const handleConfirmDelete =  (id, handleClose, handleLoading) =>{
        setConfirmModify((prev)=>{
            return {
                ...prev,
                confirm_delete: true
            }
        })
        handleLoading(true)
        helper.APICALL.DELETE(`${REACT_APP_DATABASE_URL}/record/${id}`).then(
            ()=>{
                setConfirmModify((prev)=>{
                    return {
                        ...prev,
                        confirm_delete: false
                    }
                })
                handleLoading(false)
                handleClose()
                setFilterData((prev)=>{
                    return prev.filter((data)=> data.id !== id)
                })
                setRows((prev)=>{
                  return prev.filter((data)=> data.id !== id)
              })
              const rows_test = ((filterData.length - 1) % rowsPerPage) === 0
              rows_test && setPage(page - 1)
            }
        ).catch((error)=> {
            console.log(error)
            setConfirmModify((prev)=>{
                return {
                    ...prev,
                    confirm_delete: false
                }
            })
            handleLoading(false)
            handleClose()
        })
      }
      const handleConfirmEdit =  (data, handleClose, handleLoading) =>{
        setConfirmModify((prev)=>{
            return {
                ...prev,
                confirm_edit: true
            }
        })
        handleLoading(true)
        const { id, first_name, last_name, ...params } = data
        const new_data_params = {
          first_name, last_name,
          delivery_address : {
            physical_address: params.physical_address,
            billing_address: params.billing_address
          }
        }
        helper.APICALL.PUT(`${REACT_APP_DATABASE_URL}/record/${id}`,new_data_params ).then(
            ()=>{
                setConfirmModify((prev)=>{
                    return {
                        ...prev,
                        confirm_edit: false
                    }
                })
                setRows((prev)=>{
                  return prev.map((data)=>{
                    if(data.id=== id){
                      return {
                        ...data,
                        id,
                        first_name,
                        last_name,
                        billing_address: new_data_params.delivery_address.billing_address,
                        physical_address: new_data_params.delivery_address.physical_address
                      }
                    }
                    else return data
                  })
                })
                setFilterData((prev)=>{
                  return prev.map((data)=>{
                    if(data.id=== id){
                      return {
                        ...data,
                        id,
                        first_name,
                        last_name,
                        billing_address: new_data_params.delivery_address.billing_address,
                        physical_address: new_data_params.delivery_address.physical_address
                      }
                    }
                    else return data
                  })
                })
                handleLoading(false)
                handleClose()
            }
        ).catch((error)=> {
            console.log(error)
            setConfirmModify((prev)=>{
                return {
                    ...prev,
                    confirm_edit: false
                }
            })
            handleLoading(false)
            handleClose()
        })
      }

    const generateActions = (row) =>{
        return (
            <div>
            <IconButton color="primary" onClick={()=>handleEditButton(row)}>
                <EditIcon/>
            </IconButton>
            <IconButton color="error" onClick={()=>handleDeleteButton(row)}>
                <DeleteIcon/>
            </IconButton>
            </div>
        )
      }

      useEffect(()=>{
        helper.APICALL.GET(`${REACT_APP_DATABASE_URL}/records`).then(({data})=>{
            const new_format_data = data.map(({_id,first_name, last_name, delivery_address, created_date})=> {
                return {
                    id:_id,
                    first_name,
                    last_name,
                    created_date,
                    billing_address: delivery_address.billing_address,
                    physical_address: delivery_address.physical_address
                }
            })
            setLoaded(true)
            setRows(new_format_data)
            // setFilterData(new_format_data)
        }).catch((error)=> {
            console.log(error)
            setLoaded(true)
        })
      }, [])
    
      useEffect(()=>{
        (!filterData.length && !searchValue)&& setFilterData(rows)
      }, [rows.length])
    return (
        <Paper sx={{ minWidth: '70%', maxWidth: '90%', margin: "auto" }}>
        <TableContainer sx={{ minHeight: "50%" , maxHeight: "45rem"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize: "25px", fontFamily : "sans-serif",fontWeight: "bolder"}} align="center" colSpan={2}>
                  NAME
                </TableCell>
                <TableCell style={{fontSize: "25px",  fontFamily : "sans-serif", fontWeight: "bolder"}} align="center" colSpan={2.5}>
                  DELIVERY ADDRESS
                </TableCell>
                <TableCell align="center" colSpan={2}>
          {(rows.length && loaded)? <SearchBar {...{handleSearch}}/> : <CircularProgress />}
                  </TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth, fontSize: column.fontSize }}
                    >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            { !loaded && <CircularProgress style={{top: "28%", left:"50%", position: "absolute", }}/>
            }
            {filterData.length ? 
             <TableBody>
             {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((row) => {
                 return (
                   <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                     {columns.map((column) => {
                       const value = row[column.id];
                       return (
                         <TableCell id={filterData.id} key={column.id} align={column.align} style={{fontSize: column.font_size}}>
                           {column.id === "actions" && filterData.length ? 
                               generateActions(row)
                            : column.id === "created_date" ? new Date(value).toDateString() : value }

                         </TableCell>
                       );
                     })}
                   </TableRow>
                 );
               }) }
           </TableBody>
            : <div style={{position: "relative", margin: "auto", left: "300%"}}> {loaded && "No Records Found."} </div>  
          }
           
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filterData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {showEdit && <EditModal {...{
            title : "EDIT RECORD",
            toggle: showEdit,
            setShowModal,
            data: edit_data,
            handleConfirmEdit
        }}>
          {confirm_edit && <CircularProgress size={20} style={{margin: "auto", top : "75%", left:"47%", position: "absolute"}}>
            </CircularProgress>}
          </EditModal>}
        {showDelete && <DeleteDialog {...{
            toggle: showDelete,
            title: "DELETE RECORD",
            message: `Are you sure you want to delete`,
            data: delete_data,
            setShowModal,
            handleConfirmDelete,
        }}>
            {confirm_delete && <CircularProgress size={20} style={{margin: "auto"}}/>}
            </DeleteDialog>}
      </Paper>
   
    )
}