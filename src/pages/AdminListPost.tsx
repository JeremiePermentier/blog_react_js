import styled from "styled-components";
import { useDeletePost, usePosts } from "../hooks/usePost";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef
} from "@tanstack/react-table";
import { useNavigate } from "react-router";

const StyledAdminListPost = styled.div`
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

type Post = {
    _id: string;
    title: string;
    content: string;
    coverImage: string;
    author: string;
    slug: string;
};

const AdminListPost: React.FC = () => {
    const { data, isLoading, error } = usePosts();
    const deletePost = useDeletePost();
    const navigate = useNavigate();

    const columns: ColumnDef<Post>[] = [
        {
            header: "Titre",
            accessorKey: "title",
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
                    onClick={() => deletePost.mutate(row.original._id)}
                    style={{ color: "red" }}
                >
                    Supprimer
                </button>
                <button onClick={() => navigate(`/admin/modifier-un-article/${row.original._id}`)}>Modifier</button>
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
        <StyledAdminListPost>
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
        </StyledAdminListPost>
    );
};

export default AdminListPost;
