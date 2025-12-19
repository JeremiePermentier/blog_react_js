import styled from "styled-components";
import { useCategories, useDeleteCategory } from "../hooks/useCategory";
import { useNavigate } from "react-router";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import type { ICategory } from "../types/Category.types";
import { Container } from "../shared/components/Container/Container.style";
import Button from "../shared/components/Button/Button";
import { Loader } from "../shared/Loader/Loader.style";

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
    const { data, isLoading } = useCategories();
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
                    <Button
                        variant="danger"
                        size="small"
                        loading={false}
                        onClick={() => deleteCategory.mutate(row.original._id)}
                    >
                        Supprimer
                    </Button>
                <Button
                    variant="secondary"
                    size="small"
                    loading={false}
                    onClick={() => navigate(`/admin/modifier-une-categorie/${row.original._id}`)}>Modifier</Button></>
            ),
        }
    ];

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <Loader />;

    return (
        <StyledAdminList>
            <Container textAlign="right">
                <Button variant="secondary" size="small" onClick={() => navigate("/admin/ajouter-une-categorie")} loading={false}>Créer une catégorie</Button>
            </Container>
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