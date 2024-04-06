import { ExampleWithRedux } from 'components/ExampleWithRedux'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'shadcn/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/components/ui/tabs'

export const ExampleComponent = () => {
  return (
    <Tabs defaultValue="redux" className="w-10/12 my-[20px] mx-auto">
			<TabsList className="grid w-full grid-cols-1">
				<TabsTrigger value="redux">Redux</TabsTrigger>
			</TabsList>
			<TabsContent value="redux">
				<Card>
					<CardHeader>
						<CardTitle>Redux Example!</CardTitle>
						<CardDescription>
							This example was made using redux
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<ExampleWithRedux ticker={'BTCUSDT'}/>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
  )
}

const demo = () => {
	return (
	<Tabs defaultValue="redux" className="w-10/12 my-[20px] mx-auto">
		<TabsList className="grid w-full grid-cols-2">
			<TabsTrigger value="redux">Redux</TabsTrigger>
			<TabsTrigger value="non-redux">No Redux</TabsTrigger>
		</TabsList>
		<TabsContent value="redux">
			<Card>
				<CardHeader>
					<CardTitle>Redux Example!</CardTitle>
					<CardDescription>
						This example was made using redux
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<ExampleWithRedux ticker={'BTCUSDT'}/>
				</CardContent>
			</Card>
		</TabsContent>
		<TabsContent value="non-redux">
			<Card>
			<Card>
				<CardHeader>
					<CardTitle>No Redux Example!</CardTitle>
					<CardDescription>
						This example was made without using redux
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">

				</CardContent>
			</Card>
			</Card>
		</TabsContent>
	</Tabs>)
}