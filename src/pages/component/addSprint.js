import React, { useState } from "react"
import { Link } from "react-router-dom"
import MetaTags from "react-meta-tags"
import * as Yup from "yup"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  FormFeedback,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"
import { useFormik } from "formik"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useSelector, useDispatch } from "react-redux"
import { postSprint } from "../../store/addSprint/action"

const AddSprint = () => {
  const [selectedFiles, setselectedFiles] = useState([])
  const [project, setProject] = useState("")
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [sprints, setSprints] = useState("")

  const options = [
    
    { value: "1", label: "Project1" },
    { value: "2", label: "Project2" },
    { value: "3", label: "Project3" },
    { value: "4", label: "Project4" },
    { value: "5", label: "Project5" },
    { value: "6", label: "Project6" },
  ]

  const dispatch = useDispatch()

  const data = {
    name: name,
    project_id: "1",
    user_id: "2",
    milestone_id: "",
    sprint_capacity: "",
    spilling_to_next_sprint: "",
    sprint_velocity:"",
    tickets_reopen_rate:"",
    pr_fail_rate:"",
    risks:"",
    comments:"",
    retrospective_finding:""

  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("dispatch clicked")
    dispatch(postSprint(data))
  }

  console.log(project,"projet")

  return (
    <React.Fragment>
        
      <div className="page-content">
        <MetaTags>
          <title>Creative Labs sprint</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Sprint" breadcrumbItem="Add Sprint" />

          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Sprint Information</CardTitle>

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="productname"> Name</Label>
                          <Input
                            id="productname"
                            name="productname"
                            type="text"
                            value={name}
                            onChange={e => {
                              setName(e.target.value)
                            }}
                            className="form-control"
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="control-label">Project</Label>
                          <Select
                            classNamePrefix="select2-selection"
                            placeholder="Choose..."
                            title="Country"
                            options={options}
                            onChange={e => setProject(e.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <Label className="form-label">Deadline</Label>
                          <Input
                            name="endDate"
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                          />
                        </div>
                      </Col>

                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="price">No of Sprints</Label>
                          <Input
                            id="price"
                            name="sprints"
                            type="text"
                            value={sprints}
                            onChange={e => setSprints(e.target.value)}
                            className="form-control"
                          />
                        </div>

                        <div className="mb-3">
                          <Label className="form-label">Start Date</Label>
                          <Input
                            name="startDate"
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}

                          />
                        </div>
                      </Col>
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        Add New Sprint
                      </Button>

                    </div>
                  </Form>
                </CardBody>
              </Card>


            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddSprint
