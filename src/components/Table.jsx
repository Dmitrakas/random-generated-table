import React from 'react';

const Table = ({ data, loadMoreData, hasMore, isLoading }) => {
  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Identifier</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.identifier}</td>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {hasMore && !isLoading && (
        <div className="text-center">
          <button className="btn btn-primary" onClick={loadMoreData}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Table;
