import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { usePosts } from '../hooks/usePost';

// 🔹 Mock du hook
jest.mock('../hooks/usePost', () => ({
  usePosts: jest.fn(),
}));

// 🔹 Mock du composant PostList (on teste HomePage, pas PostList)
jest.mock('../shared/components/PostList', () => ({
  PostList: ({ posts }: { posts: any[] }) => (
    <div data-testid="post-list">Posts: {posts.length}</div>
  ),
}));

const mockUsePosts = usePosts as jest.Mock;

describe('HomePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('affiche le loader pendant le chargement', () => {
    mockUsePosts.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('affiche un message d’erreur si une erreur survient', () => {
    mockUsePosts.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Erreur réseau'),
    });

    render(<HomePage />);

    expect(screen.getByText('Error: Erreur réseau')).toBeInTheDocument();
  });

  it('affiche la liste des posts quand les données sont chargées', () => {
    mockUsePosts.mockReturnValue({
      data: [
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
      ],
      isLoading: false,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByTestId('post-list')).toHaveTextContent('Posts: 2');
  });
});
