import { ChangeEvent, SetStateAction, Dispatch } from "react";

export type DeliveryAddress = {
  billing_address: string;
  physical_address: string;
};
export interface IData {
  id: string;
  first_name: string;
  last_name: string;
  billing_address: string;
  physical_address: string;
  created_date: string;
  _id?: string;
  delivery_address?: DeliveryAddress;
  code?: string;
}

export interface IColumn {
  id: string;
  label: string;
  minWidth: number;
  align: "center" | "inherit" | "left" | "right" | "justify";
  fontSize: string;
}

export interface IShowModal {
  showEdit: boolean;
  showDelete: boolean;
  edit_data: IData;
  delete_data: IData;
}

export interface IModalProps {
  data: IData;
  setShowModal: (value: any) => void;
  title: string;
  toggle: boolean;
  handleConfirmEdit: any;
  children?: JSX.Element;
}

export interface ISearchProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IDeleteDialogProps {
  children?: JSX.Element;
  title: string;
  toggle: boolean;
  message: string;
  data: IData;
  setShowModal: (value: any) => void;
  handleConfirmDelete: (value: any, handleClose: () => void, setLoading: Dispatch<SetStateAction<boolean>>) => void;
}
