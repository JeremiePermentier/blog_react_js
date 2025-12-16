import styled from "styled-components";
import { useCategories, useDeleteCategory } from "../hooks/useCategory";
import { useNavigate } from "react-router";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { ICategory } from "../types/Category.types";

const StyledAdminList = styled.div`
    padding: 1rem;
    height: 100%;
    width: 100%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 0.75rem;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th {
        background: #f5f5f5;
        font-weight: bold;
    }
`;

const AdminListCategory: React.FC = () => {
    const { data, isLoading, error } = useCategories();
    const deleteCategory = useDeleteCategory();
    const navigate = useNavigate();

    const columns: ColumnDef<ICategory>[] = [
        {
            header: "Nom de la catégorie",
            accessorKey: "name",
        },
        {
            header: "Auteur",
            accessorKey: "author.email",
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <>     
                    <button
                    onClick={() => deleteCategory.mutate(row.original._id)}
                    style={{ color: "red" }}
                >
                    Supprimer
                </button>
                <button onClick={() => navigate(`/admin/modifier-une-categorie/${row.original._id}`)}>Modifier</button></>
            ),
        }
    ];

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur de chargement</p>;

    return (
        <StyledAdminList>
            <Table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </StyledAdminList>
    );
};

export default AdminListCategory;