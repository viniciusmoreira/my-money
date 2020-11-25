import React from 'react';
import Rest from '../utils/Rest';

const baseUrl = 'https://my-money-vms.firebaseio.com/';

const Movimentacoes = ({ match }) => {
  const { useGet } = Rest(baseUrl);
  const mes = match.params.data;
  const { data, loading } = useGet(`movimentacoes/${mes}`);

  if(loading){
    return (
      <div className="container">
        <sapn>Carregando...</sapn>
      </div>
    )
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {
            data &&
            Object.keys(data)
              .map(movimentacao => (
                <tr>
                  <td>{data[movimentacao].descricao}</td>
                  <td>{data[movimentacao].valor}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </div>
  )
}

export default Movimentacoes;