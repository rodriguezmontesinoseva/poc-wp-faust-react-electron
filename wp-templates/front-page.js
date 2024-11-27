import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';
import { usePosts } from '@faustwp/core';
import { useEffect, useState } from 'react'
// import { client } from 'client';



export default function Component() {
  const [posts, setPosts] = useState()
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  // const { usePosts } = client;


  //   useEffect(() => {
  //   // const posts = usePosts();
  //   const posts = usePosts({
  //     first: 6,
  //   });
  //   console.log('post',posts)
   
  // }, []);


  // useEffect(() => {
  //   // const posts = usePosts();
  //   const posts = usePosts({
  //     first: 6,
  //   });
  //   console.log('post',posts)
   
  // }, []);
  //
  //  window.electronAPI.customFunction();

  useEffect(() => { // esto si funciona
    const llamada = async () => {
      try {
        const response = await fetch(
          'http://headless-wordpress.local/wp-json/wp/v2/posts' // DEBE SER HTTPS
          // 'http://localhost:3000/wp-json/wp/v2/posts'
        );

        const posts = await response.json();
        setPosts(posts)

        console.log('posts', posts);
      } catch (err) {
        console.log('esto no funciona', err);
      } 
    };

    llamada();
  }, []);


  // warn que diferencia si está en Navegador estándar o Electron
  useEffect(() => {
    if (typeof window.electronAPI !== 'undefined') {
      console.log('Electron API está disponible');
      window.electronAPI.customFunction();
    } else {
      console.warn('Electron API no está disponible: estás en un navegador estándar');
    }
  }, []);

  
  

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <Hero title={'Front Page'} />
          <div className="text-center">
            {posts?.map(item => (
        <div
          key={item.id}
          style={{
            border: '1px solid black',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          <h2>{item.title?.rendered}</h2>
          <p>ID: {item.id}</p>
          <p>{item.excerpt?.rendered}</p>
        </div>
      ))}
            <p>This page is utilizing the "front-page" WordPress template.</p>
            <code>wp-templates/front-page.js</code>
          </div>
        </Container>
      </Main>
      <Footer title={siteTitle} menuItems={footerMenu} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
