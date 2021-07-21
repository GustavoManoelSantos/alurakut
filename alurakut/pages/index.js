import MainGrid from '../src/components/MainGrid/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/Alurakutcommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(propriedades){
  console.log(propriedades);
  return(
    <Box>
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}}></img>
    </Box>
  )
}

export default function Home() {
  const usuario = 'GustavoManoelSantos';

  const pessoasFavoritas = [
    'akitaonrails', 
    'filipedeschamps',
    'loiane',
    ]

  return(
  <>
    <AlurakutMenu/>

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
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
                </a>
              </li> 
            )
          })}
        </ul>
      </ProfileRelationsBoxWrapper>
    </div>

    <div>
      <Box>
        Comunidades
     </Box>
    </div>

    </MainGrid>
  </>
  ) 
}
