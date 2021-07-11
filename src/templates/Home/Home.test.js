import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        { userId: 1, id: 1, title: 'post 01', body: 'aqui e um post', url: 'img/img01' },
        { userId: 1, id: 2, title: 'post 02', body: 'outer post 2', url: 'img/img02' },
        { userId: 1, id: 3, title: 'post 03', body: 'outer post 3', url: 'img/img03' },
        { userId: 1, id: 4, title: 'post 04', body: 'outer post 4', url: 'img/img04' },
        { userId: 1, id: 5, title: 'post 05', body: 'outer post 5', url: 'img/img05' },
        { userId: 1, id: 6, title: 'post 06', body: 'outer post 6', url: 'img/img06' },
        { userId: 1, id: 7, title: 'post 07', body: 'outer post 7', url: 'img/img07' },
        { userId: 1, id: 8, title: 'post 08', body: 'outer post 8', url: 'img/img08' },
        { userId: 1, id: 9, title: 'post 09', body: 'outer post 9', url: 'img/img09' },
      ]),
    );
  }),
];
const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should render search, posts and load more', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  describe('search for posts', () => {
    it('should render serach for posts', async () => {
      render(<Home />);

      const noMorePosts = screen.getByText('Não existem posts');
      await waitForElementToBeRemoved(noMorePosts);

      const search = screen.getByPlaceholderText(/type your search/i);
      expect(search).toBeInTheDocument();

      expect(screen.getByRole('heading', { name: /post 01/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /outer/i })).not.toBeInTheDocument();
    });

    it('should render search without posts returned', async () => {
      render(<Home />);

      const noMorePosts = screen.getByText('Não existem posts');
      await waitForElementToBeRemoved(noMorePosts);

      const search = screen.getByPlaceholderText(/type your search/i);
      expect(search).toBeInTheDocument();

      expect(screen.queryByRole('heading', { name: /post 01/i })).toBeInTheDocument();
      userEvent.type(search, 'outer');
      expect(screen.queryByRole('heading', { name: /outer/i })).toBeInTheDocument();
      expect(screen.getByText(/não existem posts/i)).toBeInTheDocument();
    });

    it('should render search with tow posts returned of tree posts', async () => {
      render(<Home />);

      const noMorePosts = screen.getByText('Não existem posts');
      await waitForElementToBeRemoved(noMorePosts);

      const search = screen.getByPlaceholderText(/type your search/i);
      expect(search).toBeInTheDocument();

      expect(screen.getAllByRole('heading')).toHaveLength(6);
      userEvent.type(search, 'outer');
      expect(screen.queryAllByRole('heading')).toHaveLength(1);
      expect(screen.getByText(/não existem posts/i)).toBeInTheDocument();
      userEvent.clear(search);
      expect(screen.getAllByRole('heading')).toHaveLength(6);
    });
  });

  it('should load more posts ', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existem posts');
    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    expect(screen.queryByRole('heading', { name: 'post 09' })).not.toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'post 09' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(9);
    expect(button).toBeDefined();
  });
});
