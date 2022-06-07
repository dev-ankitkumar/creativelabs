import React, { useEffect, useState, useRef } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { withRouter, Link } from "react-router-dom"
import { isEmpty } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import * as Yup from "yup"
import { useFormik } from "formik"
import DeleteModal from "../../components/Common/DeleteModal"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import * as moment from "moment"

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "store/actions"

const EcommerceOrders = props => {
  const dispatch = useDispatch()

  const [orderList, setOrderList] = useState([])
  const [order, setOrder] = useState(null)

//   console.log(order, "orderrrr")

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      projectName: (order && order.projectName) || "",
      fixedCost: (order && order.fixedCost) || "",
      shortDescription: (order && order.shortDescription) || "",
      deadline: (order && order.deadline) || "",
      techStack: (order && order.techStack) || "",
      noOfResourcesPlanned: (order && order.noOfResourcesPlanned) || "",
      spocManager: (order && order.spocManager) || "",
      pinToDashboard: (order && order.pinToDashboard) || "",

      //   orderId: (order && order.orderId) || "",
      //   billingName: (order && order.billingName) || "",
      //   orderdate: (order && order.orderdate) || "",
      //   total: (order && order.total) || "",
      //   paymentStatus: (order && order.paymentStatus) || "Paid",
      //   badgeclass: (order && order.badgeclass) || "success",
      //   paymentMethod: (order && order.paymentMethod) || "Mastercard",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Please Enter Your Project Name"),
      techStack: Yup.string().required(
        "Please Enter the technology required for project"
      ),
      spocManager: Yup.string().required("Please Enter the SPOC/Manager"),
      //   orderId: Yup.string().required("Please Enter Your Order Id"),
      //   billingName: Yup.string().required("Please Enter Your Billing Name"),
      //   orderdate: Yup.string().required("Please Enter Your Order Date"),
      //   total: Yup.string().required("Total Amount"),
      //   paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      //   badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      //   paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: values => {

    // console.log(values,"valuessssssssssssssssssssssssssssssssssss")
      if (isEdit) {
          console.log("edittriggered",values, "triggered edittttttttttttttttttt")
        const updateOrder = {
          id: order ? order.id : 0,
          projectName: values.projectName,
          fixedCost: values.fixedCost,
          shortDescription: values.shortDescription,
          deadline: values.deadline,
          techStack: values.techStack,
          noOfResourcesPlanned: values.noOfResourcesPlanned,
          spocManager: values.spocManager,
          pinToDashboard: values.pinToDashboard,
          //   orderId: values.orderId,
          //   billingName: values.billingName,
          //   orderdate: values.orderdate,
          //   total: values.total,
          //   paymentStatus: values.paymentStatus,
          //   paymentMethod: values.paymentMethod,
          //   badgeclass: values.badgeclass,
        }
        // update order
        dispatch(onUpdateOrder(updateOrder))
        validation.resetForm()
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          projectName: values["projectName"],
          fixedCost: values["fixedCost"],
          shortDescription: values["shortDescription"],
          deadline: values["deadline"],
          techStack: values["techStack"],
          noOfResourcesPlanned: values["noOfResourcesPlanned"],
          spocManager: values["spocManager"],
          pinToDashboard: values["pinToDashboard"],
          //   orderId: values["orderId"],
          //   billingName: values["billingName"],
          //   orderdate: values["orderdate"],
          //   total: values["total"],
          //   paymentStatus: values["paymentStatus"],
          //   paymentMethod: values["paymentMethod"],
          //   badgeclass: values["badgeclass"],
        }
        // save new order
        dispatch(onAddNewOrder(newOrder))
        validation.resetForm()
      }
      toggle()
    },
  })

  const { orders } = useSelector(state => ({
    orders: state.ecommerce.orders,
  }))

  const selectRow = {
    mode: "checkbox",
  }

  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: orders.length, // replace later with size(orders),
    custom: true,
  }
  const { SearchBar } = Search

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }

  const toLowerCase1 = str => {
    return str === "" || str === undefined ? "" : str.toLowerCase()
  }

  const EcommerceOrderColumns = toggleModal => [
    {
      dataField: "projectName",
      text: "Project Name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Link to="#" className="text-body fw-bold">
          {row.projectName}
        </Link>
      ),
    },
    {
      dataField: "fixedCost",
      text: "Fixed Cost",
      sort: true,
    },
    {
      dataField: "shortDescription",
      text: "Short Description",
      sort: true,
      // eslint-disable-next-line react/display-name
      //   formatter: (cellContent, row) => handleValidDate(row.orderdate),
    },
    {
      dataField: "deadline",
      text: "Deadline",
      sort: true,
      formatter: (cellContent, row) => handleValidDate(row.deadline),
    },
    {
      dataField: "techStack",
      text: "Tech Stack",
      sort: true,
    },
    {
      dataField: "noOfResourcesPlanned",
      text: "No of resources Planned",
      sort: true,
    },
    {
      dataField: "spocManager",
      text: "SPOC/Manager",
      sort: true,
    },
    {
      dataField: "pinToDashboard",
      text: "Pin To Dashboard",
      sort: true,
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, order) => (
        <>
          <div className="d-flex gap-3">
            <Link
              to="#"
              className="text-success"
              onClick={() => handleOrderClick(order)}
            >
              <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                Edit
              </UncontrolledTooltip>
            </Link>
            <Link
              to="#"
              className="text-danger"
              onClick={() => onClickDelete(order)}
            >
              <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              <UncontrolledTooltip placement="top" target="deletetooltip">
                Delete
              </UncontrolledTooltip>
            </Link>
          </div>
        </>
      ),
    },
  ]

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders())
    }
  }, [dispatch, orders])

  useEffect(() => {
    setOrderList(orders)
  }, [orders])

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders)
      setIsEdit(false)
    }
  }, [orders])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setOrder(null)
    } else {
      setModal(true)
    }
  }

  const handleOrderClick = arg => {
    const order = arg

    setOrder({
      id: order.id,
      projectName: order.projectName,
      fixedCost: order.fixedCost,
      shortDescription: order.shortDescription,
      deadline: order.deadline,
      techStack: order.techStack,
      noOfResourcesPlanned: order.noOfResourcesPlanned,
      spocManager: order.spocManager,
      pinToDashboard: order.pinToDashboard,
    })

    setIsEdit(true)

    toggle()
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  //delete order
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = order => {
    setOrder(order)
    setDeleteModal(true)
  }

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order))
      onPaginationPageChange(1)
      setDeleteModal(false)
    }
  }
  const handleOrderClicks = () => {
    setOrderList("")
    setIsEdit(false)
    toggle()
  }

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y")
    return date1
  }

  const defaultSorted = [
    {
      dataField: "projectName",
      order: "desc",
    },
  ]

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Orders | Skote - React Admin & Dashboard Template</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={EcommerceOrderColumns(toggle)}
                    data={orders}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={orders}
                        columns={EcommerceOrderColumns(toggle)}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn-rounded  mb-2 me-2"
                                    onClick={handleOrderClicks}
                                  >
                                    <i className="mdi mdi-plus me-1" />
                                    Add New Order
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField="id"
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    defaultSorted={defaultSorted}
                                    selectRow={selectRow}
                                    classes={
                                      "table align-middle table-nowrap table-check"
                                    }
                                    headerWrapperClasses={"table-light"}
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    ref={node}
                                  />
                                </div>
                                <Modal isOpen={modal} toggle={toggle}>
                                  <ModalHeader toggle={toggle} tag="h4">
                                    {!!isEdit ? "Edit Order" : "Add Order"}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form
                                      onSubmit={e => {
                                        e.preventDefault()
                                        validation.handleSubmit()
                                        return false
                                      }}
                                    >
                                      <Row form>
                                        <Col className="col-12">
                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Project Name
                                            </Label>
                                            <Input
                                              name="projectName"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.projectName ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .projectName &&
                                                validation.errors.projectName
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.projectName &&
                                            validation.errors.projectName ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.projectName}
                                              </FormFeedback>
                                            ) : null}
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Fixed Cost
                                            </Label>
                                            <Input
                                              name="fixedCost"
                                              type="select"
                                              className="form-select"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.fixedCost ||
                                                ""
                                              }
                                            >
                                              <option>True</option>
                                              <option>False</option>
                                            </Input>
                                          </div>

                                          <div className="mb-3">
                                            <Label htmlFor="short-description">
                                              Short Description
                                            </Label>
                                            <textarea
                                              className="form-control"
                                              id="shortDescription"
                                              placeholder="Short Description about project..."
                                              rows="3"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values
                                                  .shortDescription || ""
                                              }
                                            ></textarea>
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Deadline(if any)
                                            </Label>
                                            <Input
                                              name="deadline"
                                              type="date"
                                              // value={orderList.orderdate || ""}
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.deadline || ""
                                              }
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Tech Stack
                                            </Label>
                                            <Input
                                              name="techStack"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.techStack ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched.techStack &&
                                                validation.errors.techStack
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.techStack &&
                                            validation.errors.techStack ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.techStack}
                                              </FormFeedback>
                                            ) : null}
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              No of Resources Planned
                                            </Label>
                                            <Input
                                              name="noOfResourcesPlanned"
                                              type="number"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values
                                                  .noOfResourcesPlanned || ""
                                              }
                                            />
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              SPOC/Manager
                                            </Label>
                                            <Input
                                              name="spocManager"
                                              type="text"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values.spocManager ||
                                                ""
                                              }
                                              invalid={
                                                validation.touched
                                                  .spocManager &&
                                                validation.errors.spocManager
                                                  ? true
                                                  : false
                                              }
                                            />
                                            {validation.touched.spocManager &&
                                            validation.errors.spocManager ? (
                                              <FormFeedback type="invalid">
                                                {validation.errors.spocManager}
                                              </FormFeedback>
                                            ) : null}
                                          </div>

                                          <div className="mb-3">
                                            <Label className="form-label">
                                              Pin to Dashboard
                                            </Label>
                                            <Input
                                              name="pinToDashboard"
                                              type="select"
                                              className="form-select"
                                              onChange={validation.handleChange}
                                              onBlur={validation.handleBlur}
                                              value={
                                                validation.values
                                                  .pinToDashboard || ""
                                              }
                                            >
                                              <option>True</option>
                                              <option>False</option>
                                            </Input>
                                          </div>
                                        </Col>
                                      </Row>
                                      <Row>
                                        <Col>
                                          <div className="text-end">
                                            <button
                                              type="submit"
                                              className="btn btn-success save-user"
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </ModalBody>
                                </Modal>
                              </Col>
                            </Row>
                            <Row className="align-items-md-center mt-30">
                              <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                <PaginationListStandalone
                                  {...paginationProps}
                                />
                              </Col>
                            </Row>
                          </React.Fragment>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
}

export default withRouter(EcommerceOrders)
