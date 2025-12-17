import styled from "styled-components";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useDeleteTag, useTags } from "../hooks/useTag";
import type { ITag } from "../types/Tag.types";
import { useNavigate } from "react-router";

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

const AdminListTags: React.FC = () => {
    const { data, isLoading, error } = useTags();
    const deleteTag = useDeleteTag();
    const navigate = useNavigate();

    const columns: ColumnDef<ITag>[] = [
        {
            header: "Nom du tag",
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
                    onClick={() => deleteTag.mutate(row.original._id)}
                    style={{ color: "red" }}
                >
                    Supprimer
                </button>
                <button onClick={() => navigate(`/admin/modifier-un-tag/${row.original._id}`)}>Modifier</button>
                </>
            ),
        },
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

export default AdminListTags;