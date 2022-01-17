import React from "react";
import './App.css';
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from "./service/ApiService";
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true // 로딩 중이라는 상태를 표현할 변수
    };
  }

  componentDidMount() {
    // GET 요청이 성공적으로 리턴하는 경우 loading을 false로 고친다.
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = (item) => {
    call("/todo", "POST", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  update = (item) => {
    call("/todo", "PUT", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin:16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item = {item} key = {item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할 일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
    
    // 로딩 중이 아닐 때 렌더링할 부분
    var todoListPage =  (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo add = {this.add}/>
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
    );

    // 로딩 중일 때 렌더링할 부분
    var loadingPage = <h1> 로딩 중... </h1>;
    var content = loadingPage;

     // 로딩중이 아니라면 todoListPage를 선택
    if(!this.state.loading) {
      content = todoListPage;
    }

    // 선택한 content 렌더링
    return <div className="App">{content}</div>
  }
}

export default App;
