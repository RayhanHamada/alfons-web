import useServiceStore from '@/hooks/useServiceStore';
import supabaseClient from '@/utility/supabaseClient';
import { numberFormat } from '@/utility/util';
import {
  Button,
  Drawer,
  Input,
  message,
  Row,
  Space,
  Table,
  TableColumnsType,
} from 'antd';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';

type DataType = { id: number; name: string; cost_estimate: number };

const columns: TableColumnsType<DataType> = [
  {
    title: 'Nama Service',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Perkiraan Harga',
    dataIndex: 'cost_estimate',
    key: 'cost_estimate',
    render: (value) => numberFormat(value),
  },
  {
    title: 'Tambah',
    key: 'tambah',
    render: (text, record) => (
      <Space size="middle">
        <Button
          onClick={() => {
            useServiceStore.getState().addServiceId(record.id);
          }}
        >
          Tambahkan
        </Button>
      </Space>
    ),
  },
];

const ServiceDrawer: React.FC = (_props) => {
  const inputRef = useRef<Input>(null);
  const { isDrawerOpen, closeDrawer, serviceIds } = useServiceStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchLikeQuery, setSearchLikeQuery] = useState('');

  const [tableData, setTableData] = useState<
    { id: number; name: string; cost_estimate: number }[]
  >([]);

  const onSearchClick = (value: string) => {
    setSearchLikeQuery(value);
    setCurrentPage(1);
  };

  const onResetClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setSearchLikeQuery('');
    setCurrentPage(1);
    inputRef.current?.setValue('');
  };

  useEffect(() => {
    (async () => {
      const { error: selectError, data: selectData } = await supabaseClient
        .from('service')
        .select('id, name, cost_estimate')
        .ilike('name', `%${searchLikeQuery}%`)
        .range((currentPage - 1) * 20, currentPage * 20)
        .limit(20);

      if (selectError || !selectData) {
        await message.error('Gagal mengambil data service', 1);
        return;
      }
      const filteredData = selectData.filter((s) => !serviceIds.includes(s.id));
      setTableData(filteredData);
    })();
  }, [serviceIds, currentPage, searchLikeQuery]);

  return (
    <Drawer
      title="Daftar Service"
      size="large"
      onClose={closeDrawer}
      visible={isDrawerOpen}
    >
      <Row>
        <Input.Search
          onSearch={onSearchClick}
          style={{ width: 500, marginRight: 30 }}
          ref={inputRef}
        />
        <Button type="ghost" onClick={onResetClick}>
          Reset
        </Button>
      </Row>
      <br />
      <br />
      <Table
        columns={columns}
        dataSource={tableData}
        size="small"
        pagination={{ pageSize: 20, current: currentPage, total: 300 }}
        onChange={(pagination) => setCurrentPage(pagination.current!)}
      />
    </Drawer>
  );
};

export default ServiceDrawer;
