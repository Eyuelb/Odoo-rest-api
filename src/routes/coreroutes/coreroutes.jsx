import React from 'react';
import {
	HomeIcon,
	UserCircleIcon,
	TableCellsIcon,
	BellIcon,
	ArrowRightOnRectangleIcon,
	UserPlusIcon,
	UsersIcon,
	ArchiveBoxIcon,
	ArchiveBoxArrowDownIcon,
	ShoppingCartIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { 
//	HomePage,
	DashboardPage,
	// AddProduct,
	 ManageProducts,
	// EditProduct,
	LoginPage
 } from "@views";

 import { RXIcon } from '@components';

const icon = {
	className: "w-6 h-6  text-inherit",
};
export const CoreRoutes = [
	{
		title: "Main pages",
		layout: "home",
		showInSidenav: true,
		pages: [
			{
				path: '/',
				parentpath:'',
				element: <DashboardPage />,
				icon: <HomeIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Dashboard",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']
			},
			{
				path: '*',
				parentpath:'',
				element: <DashboardPage />,
				icon: '',
				exact: true,
				secured: false,
				sidenavlinked: false,
				type: 'mainPage',
				name: "Dashboard",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},
		
	
		]

	},
	{
		title: "Product Managment",
		layout: "home",
		showInSidenav: true,
		pages: [
			{
				path: '/manageProduct',
				parentpath:'',
				element: <ManageProducts />,
				icon: <ArchiveBoxIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Manage Product",
				pagesgroupId: "product",
				pagesgroupName: "product pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},	
	
		]

	},
	{
		title: "Order Managment",
		layout: "order",
		showInSidenav: true,
		pages: [
			{
				path: '/create-orders',
				parentpath:'',
				element: <DashboardPage />,
				icon: <ShoppingBagIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Create Orders",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},
			{
				path: '/direct-orders',
				parentpath:'',
				element: <DashboardPage />,
				icon: <ShoppingCartIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Direct Orders",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},	
			{
				path: '/prescription-orders',
				parentpath:'',
				element: <DashboardPage />,
				icon: <RXIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Prescription Orders",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},
	
		]

	},
	{
		title: "User Managment",
		layout: "order",
		showInSidenav: true,
		pages: [
			{
				path: '/add-users',
				parentpath:'',
				element: <DashboardPage />,
				icon: <UserPlusIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Add Users",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},	
			{
				path: '/manage-users',
				parentpath:'',
				element: <DashboardPage />,
				icon: <UsersIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: true,
				type: 'mainPage',
				name: "Manage Users",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:false,
				pageAccessPrivilege:['admin','guest']

			},
	
		]

	},
	{
		title: "Main pages",
		layout: "authentication",
		showInSidenav: false,
		pages: [
			{
				path: '/login',
				parentpath:'',
				element: <LoginPage />,
				icon: <UserCircleIcon {...icon} />,
				exact: true,
				secured: false,
				sidenavlinked: false,
				type: 'mainPage',
				name: "Login",
				pagesgroupId: "main",
				pagesgroupName: "main pages",
				offlinecanRender:true,
				pageAccessPrivilege:['guest']
			  }
		
	
		]

	},

]



export default CoreRoutes;