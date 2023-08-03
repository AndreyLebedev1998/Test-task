import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../types/hook";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  Row,
  Col,
  Button,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  changeNameCustomFolder,
  deleteCustomFolder,
  getOneCustomsFolder,
  addLetterInCustomsFolder,
} from "../../store/slices/folders";
import { getIncommingLetters } from "../../store/slices/letters";
import { PatchFolder } from "../../store/slices/folders";

const CustomFolder: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const oneFolder = useAppSelector((state) => state.oneFolder.data);
  const letters = useAppSelector((state) => state.letters.data);
  const [windowDelete, setWindowDelete] = useState(false);
  const [changeName, setChangeName] = useState("");
  const [inputChangeName, setInputChangeName] = useState(false);

  useEffect(() => {
    dispatch(getOneCustomsFolder(Number(id)));
    dispatch(getIncommingLetters());
  }, []);

  window.localStorage.setItem(
    "letters",
    JSON.stringify(
      letters.filter((el) => (oneFolder ? el.status == oneFolder.name : ""))
    )
  );

  const lettersInLocalStorage = JSON.parse(
    window.localStorage.getItem("letters") || "{}"
  );

  return (
    <div>
      {oneFolder ? (
        <>
          {inputChangeName ? (
            <>
              <Row
                className="mt-4"
                style={{
                  width: "40%",
                  margin: "auto",
                }}
              >
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">
                      Name
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      value={changeName}
                      onChange={(e) => setChangeName(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    className="mb-4"
                    onClick={() => {
                      if (changeName.length !== 0) {
                        dispatch(
                          changeNameCustomFolder({
                            id: Number(id),
                            name: String(changeName),
                          })
                        )
                          .then(() => setInputChangeName(!inputChangeName))
                          .then(() =>
                            lettersInLocalStorage.map((obj: PatchFolder) => {
                              dispatch(
                                addLetterInCustomsFolder({
                                  id: Number(obj.id),
                                  status: String(changeName),
                                })
                              );
                            })
                          )
                          .then(() => {
                            console.log(123);
                            dispatch(getOneCustomsFolder(Number(id)));
                          })
                          .then(() => dispatch(getIncommingLetters()));
                      }
                    }}
                    variant="success"
                  >
                    Изменить
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <h1>{oneFolder.name}</h1>
          )}
          <Container>
            {windowDelete ? (
              <Row
                className="mt-4"
                style={{
                  width: "60%",
                  margin: "auto",
                }}
              >
                <Col>
                  <Alert variant="success">Папка успешно удалена!</Alert>
                </Col>
              </Row>
            ) : (
              ""
            )}
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Автор</th>
                  <th>Првеью</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {letters
                  ? letters
                      .filter((el) => {
                        return el.status == oneFolder.name;
                      })
                      .map((obj) => {
                        return (
                          <>
                            <tr
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <td
                                style={{
                                  width: "30%",
                                }}
                              >
                                <Link to={`/oneLetter/${obj.id}`}>
                                  {obj.name}
                                </Link>
                              </td>
                              <td
                                style={{
                                  width: "60%",
                                }}
                              >
                                <Link to={`/oneLetter/${obj.id}`}>
                                  {obj.body}
                                </Link>
                              </td>
                              <td>
                                <Link to={`/oneLetter/${obj.id}`}>
                                  {obj.date}
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })
                  : ""}
              </tbody>
            </Table>
            <Row>
              <Col>
                <Button
                  onClick={() =>
                    dispatch(deleteCustomFolder(Number(id))).then(() =>
                      setWindowDelete(!windowDelete)
                    )
                  }
                  variant="danger"
                >
                  Удалить папку
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => setInputChangeName(!inputChangeName)}
                  variant="primary"
                >
                  Изменить имя папки
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomFolder;
