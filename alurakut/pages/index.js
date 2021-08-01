import MainGrid from '../src/components/MainGrid/MainGrid'
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

export default function Home(propriedades) {
  const usuario = 'GustavoManoelSantos';

  const pessoasFavoritas = [
    'akitaonrails', 
    'filipedeschamps',
    'loiane',
    ]

  
  const [seguidores, setSeguidores] = React.useState([]);  
  
  React.useEffect(function(){
    fetch('https://api.github.com/users/GustavoManoelSantos/followers')
    .then(function (respostaServidor){
      return respostaServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })
  }, [])



    //const comunidades = comunidades[0];
    //const alterarComunidades / setComunidades = comunidades[1];

    const [comunidades, setComunidades] = React.useState([{
      id: '568741123978564123',
      title: 'Club Penguin',
      image: 'https://hablamosdegamers.com/wp-content/uploads/2019/11/Club-Penguin-Codes-Complete-list-November-1200x900.jpg',
    }]);


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
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              title: dadosDoForm.get('image'),
            }

            const comunidadesAtualizadas = [...comunidades, comunidade];
            setComunidades(comunidadesAtualizadas);
        }}>
          <div>
            <input placeholder="Qual vai ser o nome da comuniade?" name="title" type="text" aria-label="Qual vai ser o nome da comuniade?"/>
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
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`, "https://community.cprewritten.net/"} key={itemAtual.title}>
                  <img src={itemAtual.image} />
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
