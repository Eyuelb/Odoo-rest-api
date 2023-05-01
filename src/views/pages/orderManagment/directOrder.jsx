
import { Table } from '@components';
import { useOrders } from '@stateManagment';
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid";

export const DirectOrder = () => {
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
            "pending": "Active",
            "deleted": "Suspended"
          },
          customTextColor: {
            "pending": "rgb(187 247 208 /1)",
            "deleted": "rgb(254 215 170 /1)"
          }
        },
        {
          key: '', headerTitle: 'Action', action: [
            {
              ActionKey: 'id', ActionName: 'View', ActionIcon: EyeIcon, ActionIconColor: 'blue',
              ActionHandler: (id, handleFunction) => (

                console.log("handleActionEdit(id)")
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
        { for: 'td', class: 'text-left py-2 px-4 boarder whitespace-no-wrap',
        sx:{
          borderBottomWidth:"1px"
        }
      
      },
        { for: 'tfoot', class: 'px-4 py-3 flex justify-end sm:px-6' },
      ]

    }
  ]

  return (
    <div>
      <Table TableConfiguration={TableConfiguration} data={orders} tableLoading={isGetAllOrderLoading} />
    </div>
  )
}