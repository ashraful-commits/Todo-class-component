import axios from 'axios';
import React, { Component } from 'react';
import swal from 'sweetalert';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      completeData: [],
      cancelData: [],
      input: {
        text: '',
        status: 'pandding',
      },
    };
  }
  componentDidMount = () => {
    axios
      .get('http://localhost:5050/customer?status=pandding')
      .then((res) => {
        console.log(res.data);
        this.setState((prevState) => ({
          ...prevState,
          allData: [...res.data],
        }));
      });
    axios
      .get('http://localhost:5050/customer?status=complate')
      .then((res) => {
        console.log(res.data);
        this.setState((prevState) => ({
          ...prevState,
          completeData: [...res.data],
        }));
      });

    axios
      .get('http://localhost:5050/customer?status=cancel')
      .then((res) => {
        console.log(res.data);
        this.setState((prevState) => ({
          ...prevState,
          cancelData: [...res.data],
        }));
      });
  };
  render() {
    const { text } = this.state.input;
    const { allData, completeData, cancelData } = this.state;
    const hendleInput = (e) => {
      this.setState((prevState) => ({
        ...prevState,
        input: {
          [e.target.name]: e.target.value,
          status: 'pandding',
        },
      }));
    };
    //========================== submit form
    const hendelSubmit = (e) => {
      const inputData = {
        text,
        status: 'pandding',
      };
      axios
        .post('http://localhost:5050/customer', inputData)
        .then((res) => {
          console.log(res.data);
          this.componentDidMount();
          swal({
            title: 'Added!',
            text: '',
            icon: 'success',
            button: 'ok',
          });
        });
    };
    //======================== success or complate
    const hendelSuccess = (id) => {
      axios
        .get(`http://localhost:5050/customer/${id}`)
        .then((res) => {
          console.log(res.data);
          axios
            .put(`http://localhost:5050/customer/${id}`, {
              ...res.data,
              status: 'complate',
            })
            .then((res) => {
              console.log(res.data);
              swal({
                title: 'Completed!',
                text: '',
                icon: 'success',
                button: 'ok',
              });
              this.componentDidMount();
            });
        });
    };
    const hendelCencel = (id) => {
      axios
        .get(`http://localhost:5050/customer/${id}`)
        .then((res) => {
          console.log(res.data);
          axios
            .put(`http://localhost:5050/customer/${id}`, {
              ...res.data,
              status: 'cancel',
            })
            .then((res) => {
              console.log(res.data);
              this.componentDidMount();
              swal({
                title: 'Cancel!',
                text: '',
                icon: 'warning',
                button: 'ok',
              });
            });
        });
    };
    const hendelPandding = (id) => {
      axios
        .get(`http://localhost:5050/customer/${id}`)
        .then((res) => {
          console.log(res.data);
          axios
            .put(`http://localhost:5050/customer/${id}`, {
              ...res.data,
              status: 'pandding',
            })
            .then((res) => {
              swal({
                title: 'Pandding!',
                text: '',
                icon: 'info',
                button: 'ok',
              });
              console.log(res.data);
              this.componentDidMount();
            });
        });
    };
    const hendelTrash = (id) => {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('Poof! Your imaginary file has been deleted!', {
            icon: 'success',
          });
          axios
            .delete(`http://localhost:5050/customer/${id}`)
            .then((res) => {
              console.log(res.data);
              this.componentDidMount();
            });
        } else {
          swal('Your imaginary file is safe!');
        }
      });
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col bg-primary text-center py-2 text-white ">
            <h5 className="bolder">ToDo App</h5>
          </div>
        </div>
        <div className="row m-auto my-5">
          <div className="col-md-5 m-auto">
            <div className="form d-flex shadow-sm border border-1 border-primary">
              <input
                onChange={hendleInput}
                name="text"
                value={text}
                className="form-control  rounded-0"
                type="text"
              />
              <button
                onClick={hendelSubmit}
                className="btn btn-warning rounded-0"
                type=""
              >
                <i class="bx bx-plus-medical"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row m-auto d-flex justify-content-center">
          {/*================== pandding section  */}
          {allData.length > 0 && (
            <div className="col-md-4 shadow">
              <div className="header bg-warning text-white text-center py-1">
                <h5 className="fw-bolder">Pandding</h5>
              </div>
              <div className="pandding">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>Id</th>
                      <th>Text</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData.map(({ status, text, id }, index) => (
                      <tr className="text-center">
                        <td>{id}</td>
                        <td>{text}</td>
                        <td>
                          <button
                            onClick={() => hendelSuccess(id)}
                            className="btn btn-success btn-sm border-0 me-1"
                          >
                            <i class="bx bx-check-circle"></i>
                          </button>

                          <button
                            onClick={() => hendelCencel(id)}
                            className="btn btn-danger btn-sm border-0 me-1"
                          >
                            <i class="bx bxs-x-circle"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================complate section  */}
          {completeData.length > 0 && (
            <div className="col-md-4 shadow">
              <div className="header bg-success text-white text-center py-1">
                <h5 className="fw-bold">Complate</h5>
              </div>
              <div className="complate">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>Id</th>
                      <th>Text</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completeData.map(
                      ({ status, text, id }, index) => (
                        <tr className="text-center">
                          <td>{id}</td>
                          <td>{text}</td>
                          <td>
                            <button
                              onClick={() => hendelPandding(id)}
                              className="btn btn-warning btn-sm border-0 me-1"
                            >
                              <i class="bx bx-reset"></i>
                            </button>

                            <button
                              onClick={() => hendelCencel(id)}
                              className="btn btn-danger btn-sm border-0 me-1"
                            >
                              <i class="bx bxs-x-circle"></i>
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============================cancel  */}
          {cancelData.length > 0 && (
            <div className="col-md-4 shadow">
              <div className="header bg-danger text-white text-center py-1">
                <h5 className="fw-bold">Cancel</h5>
              </div>
              <div className="Cancel">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>Id</th>
                      <th>Text</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancelData.map(({ status, text, id }, index) => (
                      <tr className="text-center">
                        <td>{id}</td>
                        <td>{text}</td>
                        <td>
                          <button
                            onClick={() => hendelPandding(id)}
                            className="btn btn-warning btn-sm border-0 me-1"
                          >
                            <i class="bx bx-reset"></i>
                          </button>
                          <button
                            onClick={() => hendelSuccess(id)}
                            className="btn btn-success btn-sm border-0 me-1"
                          >
                            <i class="bx bx-check-circle"></i>
                          </button>
                          <button
                            onClick={() => hendelTrash(id)}
                            className="btn btn-danger btn-sm border-0 me-1"
                          >
                            <i class="bx bxs-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
