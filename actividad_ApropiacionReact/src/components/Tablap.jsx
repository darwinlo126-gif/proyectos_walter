export default function Tablap({persona}){
    return (
      <table class="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">user name </th>
      <th scope="col">email</th>
      <th scope="col">phone
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>{persona.id}</td>
        <td>{persona.name}</td>
        <td>{persona.username}</td>
        <td>{persona.email}</td>
        <td>{persona.phone}</td>
      
    </tr>
    
  </tbody>
</table>

    );
}