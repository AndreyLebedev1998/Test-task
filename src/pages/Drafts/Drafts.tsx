import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../types/hook";
import { Link } from "react-router-dom";
import { Table, Container } from "react-bootstrap";
import { getIncommingLetters } from "../../store/slices/letters";

const Drafts = () => {
  const dispatch = useAppDispatch();
  const letters = useAppSelector((state) => state.letters.data);

  useEffect(() => {
    dispatch(getIncommingLetters());
  }, []);
  return (
    <div>
      <h1>Черновики</h1>
      <Container>
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
                    return el.status === "Черновик";
                  })
                  .map((el) => {
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
                            <Link to={`/oneLetter/${el.id}`}>{el.name}</Link>
                          </td>
                          <td
                            style={{
                              width: "60%",
                            }}
                          >
                            <Link to={`/oneLetter/${el.id}`}>{el.body}</Link>
                          </td>
                          <td>
                            <Link to={`/oneLetter/${el.id}`}>{el.date}</Link>
                          </td>
                        </tr>
                      </>
                    );
                  })
              : ""}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Drafts;
