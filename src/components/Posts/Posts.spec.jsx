import { render, screen } from "@testing-library/react";
import { Posts } from ".";

const props = {
  posts: [
    { title: "title 1", cover: "img/img1.png", body: "body 1", id: 1 },
    { title: "title 2", cover: "img/img2.png", body: "body 2", id: 2 },
    { title: "title 3", cover: "img/img3.png", body: "body 3", id: 3 },
  ],
};
describe("<Posts />", () => {
  it("should render Posts", () => {
    render(<Posts {...props} />);

    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole("img", { name: /title 3/i })).toHaveAttribute(
      "src",
      "img/img3.png"
    );
  });

  it("should not render posts", () => {
    render(<Posts />);
    expect(
      screen.queryByRole("heading", { name: /title/i })
    ).not.toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
