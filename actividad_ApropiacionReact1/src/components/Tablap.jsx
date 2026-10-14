export default function Tablap({persona}){
    return (
      
      <div className="container -my-4">
        <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
  <thead className="table-light">
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
        {persona.map((personas) => (
          <tr key={personas.id}>
            <td>{personas.id}</td>
            <td>{personas.name}</td>
            <td>{personas.username}</td>
            <td>{personas.email}</td>
            <td>{personas.phone}</td>
          </tr>
        ))}
      </tbody>
</table>
</div>
</div>

    );
}