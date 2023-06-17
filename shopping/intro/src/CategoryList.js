import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: [
      // { categoryId: 1, categoryName: "Beverages" },
      // { categoryId: 2, categoryName: "Condiments" },
    ],
    // curnetCategory: "",
  };
  componentDidMount() {
    this.getCategories();
  }
  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };
  // changeCategory = (category) => {
  //   this.setState({ curnetCategory: category.categoryName });

  // };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        {/* <h3>{this.state.counter}</h3> */}

        <ListGroup>
          {this.state.categories.map((category) => (
            // <ListGroupItem onClick={()=>this.setState({curnetCategory:category.categoryName})} key={category.categoryId}>{category.categoryName}</ListGroupItem>
            <ListGroupItem
              active={
                // eslint-disable-next-line eqeqeq
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              // onClick={() => this.changeCategory(category)}
              onClick={() => this.props.changeCategory(category)}
              // key={category.categoryId}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h4>{this.state.curnetCategory}</h4> */}
        {/* <h4>{this.props.curnetCategory}</h4> */}
      </div>
    );
  }
}
