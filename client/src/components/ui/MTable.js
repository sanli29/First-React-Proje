import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { MTableEditField } from 'material-table';
import AutoComplete from '@material-ui/lab/Autocomplete';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const localization = {
  tr: {
    body: {
      emptyDataSourceMessage: 'Gösterilecek kayıt yok',
      addTooltip: 'Yeni kayıt ekle',
      deleteTooltip: 'Kaydı sil',
      editTooltip: 'Kaydı düzenle',
      filterRow: {
        filterPlaceHolder: '',
        filterTooltip: 'Filtre'
      },
      editRow: {
        deleteText: 'Bu satırı silmek istediğinizden emin misiniz?',
        cancelTooltip: 'İptal',
        saveTooltip: 'Kaydet'
      }
    },
    grouping: {
      placeholder: 'Gruplamak istediğiniz sütunları buraya sürükleyin',
      groupedBy: 'Gruplanan Sütunlar: '
    },
    header: {
      actions: 'İşlemler'
    },
    toolbar: {
      addRemoveColumns: 'Sütun ekle veya sil',
      nRowsSelected: '{0} tane sütun seçildi',
      showColumnsTitle: 'Sütunları göster',
      showColumnsAriaLabel: 'Sütunları göster',
      exportTitle: 'Dışa aktar',
      exportAriaLabel: 'Dışa Aktar',
      exportCSVName: 'CSV olarak dışa aktar',
      exportPDFName: 'PDF olarak dışa aktar',
      searchTooltip: 'Arama',
      searchPlaceholder: 'Ara'
    },
    pagination: {
      labelDisplayedRows: '{count} satırdan {from}-{to} arası',
      labelRowsSelect: 'satır',
      labelRowsPerPage: 'Her sayfa için satır sayısı',
      firstAriaLabel: 'İlk Sayfa',
      firstTooltip: 'İlk Sayfa',
      previousAriaLabel: 'Önceki Sayfa',
      previousTooltip: 'Önceki Sayfa',
      nextAriaLabel: 'Sonraki Sayfa',
      nextTooltip: 'Sonraki Sayfa',
      lastAriaLabel: 'Son Sayfa',
      lastTooltip: 'Son Sayfa'
    }
  }
};

export default function MTable({ data, columns, tprops }) {
  return (
    <MaterialTable
      title={tprops.title}
      columns={columns}
      data={data}
      actions={tprops.actions}

      editable={tprops.editable}
      options={tprops.options}
      onSelectionChange={tprops.onSelectionChange}
      icons={tableIcons}
    />
  );
}
