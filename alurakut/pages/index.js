import MainGrid from '../src/components/MainGrid/MainGrid'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/Alurakutcommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import React from 'react';


function ProfileSideBar(propriedades){
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />
    <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return(
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {propriedades.title} ({propriedades.items.length})
        </h2>
        
       <ul>
          {/*propriedades.map((itemAtual) => {
            return(
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}.png`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
                </a>
              </li> 
            )
          })*/}
        </ul>
      </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {

  const usuario = props.githubUser;

  const pessoasFavoritas = [
    'akitaonrails', 
    'filipedeschamps',
    'loiane',
    ]

  const [seguidores, setSeguidores] = React.useState([]);  

  const [comunidades, setComunidades] = React.useState([])

  React.useEffect(function(){
    fetch('https://api.github.com/GustavoManoelSantos/followers')
    .then(function (respostaServidor){
      return respostaServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })

    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'a927d54ebd5460a82fbc547b55da3c',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)
    })
  }, [])

    ;

    //const comunidades = comunidades[0];
    //const alterarComunidades / setComunidades = comunidades[1];

    

  return(
  <>
    <AlurakutMenu githubUser={ usuario }/>

    <MainGrid>
      <div className="profileArea" style={{gridArea: 'profileArea'}}>
       <ProfileSideBar githubUser={usuario} />
      </div>
     
     <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
      <Box>
        <h1 className="title">
          Bem Vindo (a)
        </h1>
        <OrkutNostalgicIconSet/>
      </Box>

      <Box>
        <h2 className="subTitle">O que você deseja fazer?</h2>
        <form onSubmit={function handlerCriarComunidade(evento) {
            evento.preventDefault();
            const dadosDoForm = new FormData(evento.target);
            console.log('Campo: ', dadosDoForm.get('title'));
            console.log('Campo: ', dadosDoForm.get('image'));
            //console.log(evento);

            //comunidades.push('Teste');
            //console.log(comunidades);

            const comunidade = {
              title: dadosDoForm.get('title'),
              imageUrl: dadosDoForm.get('image'),
              creatorSlug: usuario,
            }

            fetch('api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);
            })  
        }}>

          <div>
            <input placeholder="Qual vai ser o nome da comunidade?" name="title" type="text" aria-label="Qual vai ser o nome da comunidade?"/>
          </div>

          <div>
            <input placeholder="Coloque uma URL para ser a sua capa" name="image" aria-label="Coloque uma URL para ser a sua capa"/>
          </div>
          
          <button>Criar Comunidade</button>

        </form>
      </Box>
     </div>

    <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Pessoas da Comunidade ({pessoasFavoritas.length})
        </h2>
        
        <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return(
              //<li>{itemAtual}</li>
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
                </a>
              </li> 
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}/>
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>     
      
      <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
          Comunidades ({comunidades.length})
        </h2>

      <ul>
          {comunidades.map((itemAtual) => {
            return(
              <li>
                <a href={`/communities/${itemAtual.id}`}>
                  <img src={itemAtual.imageUrl} />
                <span>{itemAtual.title}</span>
                </a>
              </li> 
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    </div>

    </MainGrid>
  </>
  ) 
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
 
  const { isAuthenticated } =  await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then((resposta) => resposta.json())

  console.log('isAuthenticated: ', isAuthenticated);

  if(!isAuthenticated){
    return{
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser
    },
  }
}
