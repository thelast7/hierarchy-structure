import React, {Component} from 'react'
import MUIDataTable from 'mui-datatables'
import { MyForm } from './my-form'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class DataList extends Component {
  render() {
    let {
      columns,
      options
    } = this.requiredTable,
    {
      data,
      mode,
      modal,
      formData,
      childData,
      childTabel,
      listUnitKerja,
      listDepartment,
      listPosition
    } = this.state

    return (
      <div>
        <button
          className="btn btn-success"
          onClick={() => this.toggleModal('add')}
        >
          Add New
        </button>
        <MUIDataTable
          columns={columns}
          options={options}
          data={this.state.data}
        />
        <Modal
          isOpen={modal}
          size="lg"
        >
          <ModalHeader
          >
            {mode === 'add' ? 'ADD' : 'DETAIL'}
          </ModalHeader>
          <ModalBody>
            <MyForm
              data={data}
              mode={mode}
              formData={formData}
              childData={childData}
              childTabel={childTabel}
              listPosition={listPosition}
              listUnitKerja={listUnitKerja}
              listDepartment={listDepartment}
              onChangeInput={this.onChangeInput}
              showChildTabel={this.showChildTabel}
              requiredTableChild={this.requiredTableChild}
              onChangeInputSelect={this.onChangeInputSelect}
            />
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={this.saveDataToServer}
              disabled={mode === 'show'}
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.toggleModal('add')}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

  state = {
    data: [],
    childData: [],
    mode: 'add',
    modal: false,
    childTabel: false,
    listUnitKerja: [],
    listDepartment: [],
    listPosition: [],
    dataStructure: [],
    formData: {
      name: '',
      description: '',
      id_unit_kerja: [],
      placement: []
    }
  }

  requiredTable = {
    columns: [
      { name: "No" },
      { name: "Name" },
      { name: "Description" },
      { name: "Applied At",
        options: {
          customBodyRender: value => {
            let result = value.map((val,i) => {
              return (
                <li key={i}>
                  {val.nama_unit_kerja}
                </li>
              )
            })
            return (
              <ul>{result}</ul>
            )
          }
        }
      },
      { name: "Input By" },
      { name: "Update By" },
      { name: "Last Update",
        options: {
          customBodyRender: value => {
            if(value){
              return new Date(value).toDateString()
            }
            return <span>No Updated</span>
          }
        }
      },
      { name: "Action",
        options: {
          customBodyRender: value => {
            return (
              <button
                className="btn btn-primary"
                onClick={() => this.getDataHierarchyById(value, 'show')}
              >
                Show
              </button>
            )
          }
        }
      },
    ],
    options: {
      selectableRows: 'none',
      filterType: "dropdown",
      responsive: "scroll",
      fixedHeader: false,
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      search: false
    }
  }

  requiredTableChild = {
    columns: [
      { name: "No" },
      { name: "Position and Department" },
      { name: "Parent" },
      // { name: "Action",
      //   options: {
      //     customBodyRender: value => {
      //       return (
      //         <button
      //           className="btn btn-danger"
      //           // onClick={() => getDataHierarchyById(value)}
      //         >
      //           Delete
      //         </button>
      //       )
      //     }
      //   }
      // },
    ],
    options: {
      selectableRows: 'none',
      filterType: "dropdown",
      responsive: "scroll",
      fixedHeader: false,
      download: false,
      print: false,
      filter: false,
      viewColumns: false,
      search: false
    }
  }

  toggleModal = mode => {
    this.setState({
      mode,
      modal: !this.state.modal,
      childTabel: false,
      childData: [],
      formData: {
        name: '',
        description: '',
        id_unit_kerja: [],
        department_structure: '',
        department_parent: ''
      }
    })
  }
  
  onChangeInput = e => {
    let {target} = e
    this.setState(prev => {
      return {
        formData: {
          ...prev.formData,
          [target.id]: target.value
        }
      }
    })
  }

  onChangeInputSelect = (key,e) => {
    this.setState(prev => {
      return {
        formData: {...prev.formData,[key]: e}
      }
    })
  }

  showChildTabel = () => {
    let { formData } = this.state, newDataStructure = [], newChildData = [], i = 1
    if(formData.department_structure
      && formData.position_structure
      && formData.department_parent
      && formData.position_parent
      ) {
      newDataStructure = {
        id_department: formData.department_structure.value,
        id_position: formData.position_structure.value,
        id_parent_department: formData.department_parent.value,
        id_parent_position: formData.position_parent.value
      }
      newChildData.push(
        i++,
        `${formData.department_structure.label} - ${formData.position_structure.label}`,
        `${formData.department_parent.label} - ${formData.position_parent.label}`,
        // i++
      )
    }
    this.setState(prev => {
      return {
        childTabel: true,
        dataStructure: [ ...prev.dataStructure, newDataStructure ],
        childData: [ ...prev.childData, newChildData ]
      }
    })
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    try{
      let i=1, data=[], listUnitKerja=[], listDepartment=[], listPosition=[],
      authToken = localStorage.getItem('token'),
      config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      }, postData1, postData2,
      temp = await Promise.all([
        postData1 = (await fetch('https://emonica-demo-api.nusatek.id/v2/hierarchy-structure', config)).json(),
        postData2 = (await fetch('https://emonica-demo-api.nusatek.id/v1/unit-kerja', config)).json(),
        postData2 = (await fetch('https://emonica-demo-api.nusatek.id/v1/bagian', config)).json(),
        postData2 = (await fetch('https://emonica-demo-api.nusatek.id/v1/jabatan', config)).json()
      ])
      if(temp[0].payload && temp[0].payload instanceof Array){
        data = temp[0].payload.map(val => ([
          i++,
          val.name,
          val.description,
          val.id_unit_kerja,
          val.input_by,
          val.update_by,
          val.updated_at,
          val.id_hierarchy_structure
        ]))
      }
      if(temp[1].payload && temp[1].payload instanceof Array){
        listUnitKerja = temp[1].payload.map(val => ({
          label: val.nama_unit_kerja,
          value: val.id_unit_kerja
        }))
      }
      if(temp[2].payload && temp[2].payload instanceof Array){
        listDepartment = temp[2].payload.map(val => ({
          label: val.nama_bagian,
          value: val.id_bagian
        }))
      }
      if(temp[3].payload && temp[3].payload instanceof Array){
        listPosition = temp[3].payload.map(val => ({
          label: val.nama_jabatan,
          value: val.id_jabatan
        }))
      }
      this.setState({
        data,
        modal: false,
        authToken,
        listUnitKerja,
        listDepartment,
        listPosition
      })
    }catch(error){
      console.log(error)
    }
  }
  
  async getDataHierarchyById(value, mode) {
    try{
      let i=1, temp, { authToken } = this.state, childData = [], id_unit_kerja,
      department_structure, position_structure, department_parent, position_parent,
      url = 'https://emonica-demo-api.nusatek.id/v2/hierarchy-structure/',
      config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        }
      },
      postData = await fetch(url + value, config)
      temp = await postData.json()
      if(temp.status_code === 200){
        id_unit_kerja = temp.payload.id_unit_kerja.map(val => ({
          label: val.nama_unit_kerja, value: val.id_unit_kerja
        }))
        department_structure = temp.payload.placement.map(val => ({
          label: val.department, value: val.id_department
        }))
        position_structure = temp.payload.placement.map(val => ({
          label: val.position, value: val.id_position
        }))
        department_parent = temp.payload.placement.map(val => {
          if(val.id_parent_department === 0){
            return {
              label: '--TOP--', value: 0
            }
          }
          return {
            label: val.parent_department,
            value: val.id_parent_department
          }
        })
        position_parent = temp.payload.placement.map(val => {
          if(val.id_parent_position === 0){
            return {
              label: '--TOP--', value: 0
            }
          }
          return {
            label: val.parent_position, value: val.id_parent_position
          }
        })
        for(let j=0; j<temp.payload.placement.length; j++){
          let data = temp.payload.placement, parent_department, parent_position
          if(data[j].id_parent_department === 0 || data[j].id_parent_position === 0){
            parent_department = '--TOP--'
            parent_position = '--TOP--'
          }else{
            parent_department = data[j].parent_department
            parent_position = data[j].parent_position
          }
          childData.push([
            i++,
            `${data[j].department} - ${data[j].position}`,
            `${parent_department} - ${parent_position}`,
          ])
        }
        this.setState( (prev) => {{
          return {
            modal: true,
            childTabel: true,
            mode,
            formData: {
              ...prev.formData,
              name: temp.payload.name,
              description: temp.payload.description,
              id_unit_kerja,
              department_structure,
              position_structure,
              department_parent,
              position_parent,
            },
            childData: [ ...childData ]
          }
        }
        })
      }
    }catch(error){
      console.log(error)
    }
  }

  saveDataToServer = async e => {
    e.preventDefault()
    // await this.getAllData()
    // this.setState({modal:false})
    try{
      let temp, { formData, dataStructure, authToken } = this.state,
      url = 'https://emonica-demo-api.nusatek.id/v2/hierarchy-structure',
      postData, id_unit_kerja = formData.id_unit_kerja.map(val => val.value)
      postData = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          id_unit_kerja,
          placement: dataStructure
        })
      })
      temp = await postData.json()
      // await this.getAllData()
      if(temp.status_code === 201 || temp.status_code === 200){
        await this.getAllData()
      }else{
        alert(temp.description)
        this.setState({dataStructure:[],childData:[]})
      }
    }catch(error){
      console.log(error)
    }
  }
}