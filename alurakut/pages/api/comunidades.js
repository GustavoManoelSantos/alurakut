import { SiteClient } from 'datocms-client';
 
export default async function recebeRequest(request, response){

    if(request.method === 'POST'){
        const TOKEN = '6dd463666a88b7c9acabe0a7affe31';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: "1039134",
            ...request.body,
            //title:"Comunidade Teste",
            //imageUrl:"https://github.com/GustavoManoelSantos.png",
            //creatorSlug:"GustavoManoelSantos"
        })

        console.log(registroCriado);
    
        response.json({
            dados: 'Dados',
            registroCriado: registroCriado,
        })
        return;
    } 
    response.status(404).json({
        message: 'Ainda não há nada no GET, mas há no POST'
    })  
}