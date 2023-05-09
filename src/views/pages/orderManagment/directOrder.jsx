
import { Table } from '@components';
import { useOrders } from '@stateManagment';
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

export const DirectOrder = () => {
  const navigate = useNavigate();
  const { orders, isGetAllOrderLoading } = useOrders();

  const TableConfiguration = [
    {
      TableTittle: 'Order List',
      defaultSortOrder: 'asc',
      defaultSortColumn: 'orderUniqueId',
      rowsPerPage: 10,
      searchKeys: ['orderUniqueId'],
      ColumnsData: [
        { key: 'id', headerTitle: 'ID', },
        { key: 'orderUniqueId', headerTitle: 'Order ID', action: [] },
        { key: 'quantity', headerTitle: 'Quantity', action: [] },
        {
          key: 'orderStatus', headerTitle: 'Order Status', action: []
          , customTextReplacment: {
            "pending": "Pending",
            "deleted": "Closed"
          },

          customTextHolderColor: {
            "pending": "#03a503",
            "deleted": "#ff2d55"
          },
          customStyle: {
            "color": "#fff",
            "borderRadius":"4px",
            "display":"flex",
            "alignItems":"center",
            "justifyContent":"center",
            "padding":"1px",
            "width":"100px",
          }
        },
        {
          key: '', headerTitle: 'Action', action: [
            {
              ActionKey: 'id', ActionName: 'View', ActionIcon: EyeIcon, ActionIconColor: 'blue',
              ActionHandler: (id, handleFunction) => (
                navigate(`/direct-orders/p/${id}`)
              ),
              ActionTask: ''
            },
          ]
        },
      ],
      ClassData: [
        {
          for: 'table', class: 'w-full overflow-hidden ',
          sx: {
          //  boxShadow: t => `0px 1px 11px 0px ${t.colors.text}`,
          
          }
        }, // add shadow-md to create a shadow effect


        {
          for: 'thead', class: '',
          sx: {
            bg: "secondary",
            fontWeight: "700",

          }
        },
        {
          for: 'tr', class: ` `,
          sx:
          {

            '&:hover':
            {
              color: 'black',
              bg: "secondary"
            }
          }
        },
        { for: 'th', class: 'text-left py-2 px-4 tracking-wider' },
        { for: 'tbody', class: '' },
        { for: 'td', class: 'text-left py-2 px-4 boarder  whitespace-no-wrap',
        sx:{
          borderBottomWidth:"1px"
        }
      
      },
        { for: 'tfoot', class: 'px-4 py-3 flex justify-end sm:px-6' },
      ]

    }
  ]

  return (
    <div className=' overflow-hidden'>
      <Table TableConfiguration={TableConfiguration} data={orders.length > 0 && Array.isArray(orders)?orders:[]} tableLoading={orders.length > 0 && Array.isArray(orders)?isGetAllOrderLoading:true} />
    </div>
  )
}