// import { Component } from "react";
import "./style.css";

// Usando class e controlando o stado 
// export class Home extends Component {
//   state = {
//     counter: 0
//   }

//   handleClick = () => {
//     this.setState((prevState, prevProps) => {
//       return { counter: prevState.counter + 1}
//     },
//       () => console.log(this.state.counter))
//   } 

//   render() {
//     return (
//       <div className="conteiner">
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Incrementar</button>
//       </div>
//     )
//   }
// }

import { useEffect, useState, useCallback } from "react";
import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

// Usando function
export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : posts;

      
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);
      
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };
        
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  
  return (
    <section className="conteiner">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}

        <TextInput
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não existem posts</p>}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// Usando class
// export class Home extends Component {
//   firstName = "Mateo Barrios";
//   secondaryName = "Outro nome";

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 6,
//     searchValue: "",
//   };

//   // Similar ao onInit do Angular
//   async componentDidMount() {
//     // Busca de dados e neste ponto (Chamada de API)
//     await this.loadPosts();
//   }

//   // E chamado sempre que o state e atualizado.
//   componentDidUpdate() {}

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };

//   // Chama antes de desmontar o componente.
//   // Usar para limpar os componentes utilizados.
//   componentWillUnmount() {}

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) =>
//           post.title.toLowerCase().includes(searchValue.toLowerCase())
//         )
//       : posts;
//     return (
//       <section className="conteiner">
//         <div className="search-container">
//           {!!searchValue && <h1>Search value: {searchValue}</h1>}

//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>

//         {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
//         {filteredPosts.length === 0 && <p>Não existem posts</p>}

//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }
