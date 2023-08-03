import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Dropdown, Alert } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../types/hook";
import {
  getOneLetter,
  remoteLetter,
  draftsLetter,
  spamLetter,
  deleteOneLetter,
} from "../../store/slices/letters";
import { addLetterInCustomsFolder } from "../../store/slices/folders";

const OneLetter: React.FC = () => {
  const dispatch = useAppDispatch();
  const oneLetter = useAppSelector((state) => state.oneLetter.data);
  const folders = useAppSelector((state) => state.folders.data);
  const [windowDelete, setWindowDelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneLetter(Number(id)));
  }, []);

  const goBack = () => navigate(-1);
  return (
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
            <Alert variant="success">Письмо успешно удалено!</Alert>
          </Col>
        </Row>
      ) : (
        ""
      )}
      <h1 className="mt-3">Письмо №{id}</h1>
      {oneLetter ? (
        <div className="oneLetter">
          <Row
            style={{
              alignItems: "flex-end",
            }}
          >
            <Col className="mt-4 ml-5" xl={11}>
              <h4>Автор письма: {oneLetter.name}</h4>
            </Col>
            {oneLetter.status === "Отправленные" ? (
              ""
            ) : (
              <Col>
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      fontSize: "1.2rem",
                    }}
                    variant="success"
                    id="dropdown-basic"
                  >
                    <FiSettings />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => dispatch(remoteLetter(Number(id)))}
                    >
                      В удаленное
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(draftsLetter(Number(id)))}
                    >
                      В черновики
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(spamLetter(Number(id)))}
                    >
                      В спам
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            )}
          </Row>
          <Row>
            <Col className="m-auto mt-4" lg={8}>
              <p
                style={{
                  fontSize: "1.4rem",
                }}
              >
                Письмо: {oneLetter.body}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="mt-4">
              <p
                style={{
                  fontSize: "1.4rem",
                }}
              >
                Дата: {oneLetter.date}
              </p>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle
                  style={{
                    fontSize: "1.2rem",
                  }}
                  variant="success"
                  id="dropdown-basic"
                >
                  В кастомную папку
                </Dropdown.Toggle>

                {folders ? (
                  <Dropdown.Menu>
                    {folders.map((el) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            dispatch(
                              addLetterInCustomsFolder({
                                id: Number(oneLetter.id),
                                status: String(el.name),
                              })
                            ); /* .then(() => {
                              dispatch(
                                getLettersInCustomsFolder(Number(el.id))
                              );
                              console.log(123);
                            }); */
                          }}
                        >
                          {el.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                ) : (
                  ""
                )}
              </Dropdown>
            </Col>
            <Col>
              <Button
                onClick={() =>
                  dispatch(deleteOneLetter(Number(id))).then(() =>
                    setWindowDelete(!windowDelete)
                  )
                }
                variant="danger"
              >
                Удалить
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      <Button className="mt-4" onClick={goBack} variant="secondary">
        Назад
      </Button>
    </Container>
  );
};

export default OneLetter;
