export interface ColumnInterface {
    label: string;
    key: string;
    accessor: (row: any) => any;
}
