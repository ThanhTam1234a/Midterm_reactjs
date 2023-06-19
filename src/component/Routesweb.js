import React from 'react';											
import Add from './Add';		
import Edit from './Edit';			
import ProductList from './ProductList';					
								
export const Routesweb = [								
	{
		path: '/',
		element: <ProductList/>,
		index: true
	},							
    {
		path: '/Add',
		element: <Add/>,
		index: false
	},
	{
		path: '/edit/:id',
		element: <Edit/>,
		index: false
	  }				
	
	  
]					
								
							