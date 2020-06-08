import React from 'react'
import Select from 'react-select'
import MUIDataTable from 'mui-datatables'

export const MyForm = (props) => {
  let {
    mode,
    data,
    formData,
    childData,
    childTabel,
    listPosition,
    listUnitKerja,
    listDepartment
  } = props
  let listDepartmentParent = [ {label: '--TOP--', value: 0}, ...listDepartment ],
  listPositionParent = [ {label: '--TOP--', value: 0}, ...listPosition ]
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Name</label>
            <input
              id="name"
              className="form-control"
              placeholder="Insert your name"
              value={formData.name}
              onChange={props.onChangeInput}
              disabled={mode === 'show'}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Applied At</label>
            <Select
              isMulti
              options={listUnitKerja}
              placeholder="Select your unit"
              value={formData.id_unit_kerja}
              onChange={(e) => props.onChangeInputSelect('id_unit_kerja', e)}
              isDisabled={mode === 'show'}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Desription</label>
            <textarea
              id="description"
              className="form-control"
              placeholder="Insert description"
              value={formData.description}
              onChange={props.onChangeInput}
              disabled={mode === 'show'}
            />
          </div>
        </div>
      </div><hr />
      <h4>Structure</h4>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Department</label>
            <Select
              options={listDepartment}
              placeholder="Select department structure"
              value={formData.department_structure}
              onChange={(e) => props.onChangeInputSelect('department_structure', e)}
              isDisabled={mode === 'show'}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Position</label>
            <Select
              options={listPosition}
              placeholder="Select position structure"
              value={formData.position_structure}
              onChange={(e) => props.onChangeInputSelect('position_structure', e)}
              isDisabled={mode === 'show'}
            />
          </div>
        </div>
      </div>
      <h4>Parent</h4>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Department</label>
            <Select
              options={listDepartmentParent}
              placeholder="Select department parent"
              value={formData.department_parent}
              onChange={(e) => props.onChangeInputSelect('department_parent', e)}
              isDisabled={mode === 'show'}
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Position</label>
            <Select
              options={listPositionParent}
              placeholder="Select position parent"
              value={formData.position_parent}
              onChange={(e) => props.onChangeInputSelect('position_parent', e)}
              isDisabled={mode === 'show'}
            />
          </div>
        </div>
      </div>
      <div className="text-right">
        <button
          className="btn btn-danger"
          onClick={props.showChildTabel}
          disabled={mode === 'show' || !formData.position_parent || !formData.department_structure}
        >
          Add Structure
        </button>
      </div>
      {childTabel && (
        <div className="row mt-3">
          <div className="col-12">
            <MUIDataTable
              columns={props.requiredTableChild.columns}
              options={props.requiredTableChild.options}
              data={props.childData}
            />
          </div>
        </div>
      )}
    </div>
  )
}