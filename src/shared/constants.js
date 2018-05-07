/* eslint-disable import/prefer-default-export */

export const INPUT_TYPE = Object.freeze({
  INPUT_TYPE_COUNTRY: 'SELECT_COUNTRY',
  INPUT_TYPE_YEAR: 'SELECT_YEAR',
  INPUT_TYPE_SALES_RANGE: 'SELECT_SALES_RANGE',
});

export const COLUMN_DEFS = Object.freeze([
  { headerName: 'Kraj/Region', field: 'country', minWidth: 130 },
  { headerName: '2005', field: '2005', minWidth: 70 },
  { headerName: '2006', field: '2006', minWidth: 70 },
  { headerName: '2007', field: '2007', minWidth: 70 },
  { headerName: '2008', field: '2008', minWidth: 70 },
  { headerName: '2009', field: '2009', minWidth: 70 },
  { headerName: '2010', field: '2010', minWidth: 70 },
  { headerName: '2011', field: '2011', minWidth: 70 },
  { headerName: '2012', field: '2012', minWidth: 70 },
  { headerName: '2013', field: '2013', minWidth: 70 },
  { headerName: '2014', field: '2014', minWidth: 70 },
  { headerName: '2015', field: '2015', minWidth: 70 },
  { headerName: '2016', field: '2016', minWidth: 70 },
  { headerName: '2017', field: '2017', minWidth: 70 },
]);

export const AVAILABLE_YEARS = getYearsFromColumnDefs();

function getYearsFromColumnDefs() {
  return COLUMN_DEFS.reduce(
    (acc, col) =>
      Number(col.field) && [...acc, { value: col.field, label: col.field }],
    [],
  );
}

export const INPUT_WIDTH = 230;
