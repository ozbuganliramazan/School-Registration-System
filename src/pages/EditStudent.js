import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [willEditStudent, setWillEditStudent] = useState(null);
  const [studentNo, setStudentNo] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [schoolName, setSchollName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3004/students/${studentId}`)
      .then((res) => {
        console.log(res.data);
        setWillEditStudent(res.data);
        setStudentNo(res.data.studentNo);
        setName(res.data.name);
        setSurname(res.data.surname);
        setStudentClass(res.data.studentClass);
        setSchollName(res.data.schoolName);
      })
      .catch((err) => {
        console.log(err);
        alert("İlgili öğrenci bilgilerini çekerken bir hata oluştu.");
        navigate("/");
      });
  }, []);
  const handleEdit = (event) => {
    event.preventDefault();

    if (
      studentNo === "" ||
      name === "" ||
      surname === "" ||
      studentClass === "" ||
      schoolName === ""
    ) {
      alert("Bütün Alanları Doldurmak Zorunludur.");
      return;
    }
    const updatedStudent = {
      id: willEditStudent.id,
      name: name,
      surname: surname,
      studentClass: studentClass,
      schoolName: schoolName,
      studentNo: studentNo,
    };
    axios
      .put(
        `http://localhost:3004/students/${willEditStudent.id}`,
        updatedStudent
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Güncelleme esnasında bir hata oluştu");
      });
  };
  if (willEditStudent === null) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleEdit}>
          <div className="mb-3">
            <label htmlFor="studentNo" className="form-label">
              Öğrenci Numarası
            </label>
            <input
              type="number"
              className="form-control"
              id="studentNo"
              placeholder="Ör: 100"
              value={studentNo}
              onChange={(event) => setStudentNo(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Öğrenci Adi
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Ör: Ahmet"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Öğrenci Soyadı
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Ör: kılç"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentClass" className="form-label">
              Öğrenci Sınıfı
            </label>
            <input
              type="text"
              className="form-control"
              id="studentClass"
              placeholder="Ör: 5/A"
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="schoolName" className="form-label">
              Okul Adı
            </label>
            <input
              type="text"
              className="form-control"
              id="schoolName"
              placeholder="Ör: Cumhuriyet İ.Ö.O"
              value={schoolName}
              onChange={(event) => setSchollName(event.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-outline-primary w-50 ">
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
