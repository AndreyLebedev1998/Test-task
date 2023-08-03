import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../types/hook";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  createCustomFolder,
  getCustomsFolder,
} from "../../store/slices/folders";

const foldersLetters = [
  { name: "Главная", element: "/" },
  { name: "Входящие", element: "/incoming" },
  { name: "Отправленные", element: "/sent" },
  { name: "Черновики", element: "/drafts" },
  { name: "Удаленные", element: "/deleted" },
  { name: "Спам", element: "/spam" },
];

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const folders = useAppSelector((state) => state.folders.data);
  const [show, setShow] = useState(false);
  const [createFolder, setCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseFolder = () => setCreateFolder(false);
  const handleShowFolder = () => setCreateFolder(true);

  useEffect(() => {
    dispatch(getCustomsFolder());
  }, []);

  return (
    <div>
      <Button className="mt-5" variant="primary" onClick={handleShow}>
        Меню
      </Button>

      <Offcanvas
        style={{ backgroundColor: "rgb(49, 44, 44)" }}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title
            style={{
              color: "white",
            }}
          >
            Папки с письмами
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {foldersLetters.map((folder) => {
            return (
              <div className="divLink">
                <NavLink className="link" to={folder.element}>
                  {folder.name}
                </NavLink>
              </div>
            );
          })}
          <h2
            onClick={handleShowFolder}
            style={{
              color: "white",
              cursor: "pointer",
            }}
            className="mt-5"
          >
            Создание папки
          </h2>
          {folders ? (
            <Dropdown className="mt-5">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Ваши папки
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {folders.map((el) => {
                  return (
                    <Dropdown.Item href={`/customFolder/${el.id}`}>
                      {el.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            ""
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={createFolder} onHide={handleCloseFolder}>
        <Modal.Header closeButton>
          <Modal.Title>Создание папки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Введите название папки"
                autoFocus
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleCloseFolder();
              dispatch(
                createCustomFolder({ name: folderName, letters: [] })
              ).then(() => dispatch(getCustomsFolder()));
            }}
          >
            Создать
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Main;
