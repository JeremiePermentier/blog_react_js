import styled from "styled-components";
import { useDeletePost, usePosts } from "../hooks/usePost";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef
} from "@tanstack/react-table";
import { useNavigate } from "react-router";
import Button from "../shared/components/Button/Button";
import { Container } from "../shared/components/Container/Container.style";
import { Loader } from "../shared/Loader/Loader.style";

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
    const { data, isLoading } = usePosts();
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
                    <Button
                        onClick={() => deletePost.mutate(row.original._id)}
                        variant="danger"
                        size="small"
                        loading={false}
                    >
                        Supprimer
                    </Button>
                    <Button
                        variant="secondary"
                        size="small"
                        loading={false}
                        onClick={() => navigate(`/admin/modifier-un-article/${row.original._id}`)}
                    >
                        Modifier
                    </Button>
                </>
            ),
        },
    ];

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <Loader />

    return (
        <StyledAdminListPost>
            <Container textAlign="right">
                <Button variant="secondary" size="small" onClick={() => navigate("/admin/ajouter-un-article")} loading={false}>Créer un article</Button>
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
        </StyledAdminListPost>
    );
};

export default AdminListPost;
