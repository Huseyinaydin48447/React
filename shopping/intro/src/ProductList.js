import React, { Component } from "react";
import { Table, Button } from "reactstrap";

export default class ProductList extends Component {
  // addToCart = (product) => {
  //   alert(product.productName);
  // };
  render() {
    return (
      <div>
        {/* <h3>{this.props.info.title}</h3> */}

        <h3>
          {this.props.info.title}-{this.props.curnetCategory}
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr
                // onClick={() => this.props.changeCategory(category)}
                key={product.id}
              >
                <th scope="row">{product.id}</th>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{/* <Button color="info">add</Button> */}</td>
                <td>
                  <Button
                    onClick={() => this.props.addToCart(product)}
                    color="info"
                  >
                    add
                  </Button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
          </tbody>
        </Table>
      </div>
    );
  }
}
