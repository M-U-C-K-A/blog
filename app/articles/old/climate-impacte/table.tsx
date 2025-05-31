import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function Tableau() {
	return (
		  <Table>
			<TableCaption>Données collectées entre 2015 et 2025 dans cinq zones océaniques</TableCaption>
			<TableHeader>
			  <TableRow>
				<TableHead>Zone</TableHead>
				<TableHead>Temp. 2015 (°C)</TableHead>
				<TableHead>Temp. 2025 (°C)</TableHead>
				<TableHead>Variation</TableHead>
				<TableHead>Espèces 2015</TableHead>
				<TableHead>Espèces 2025</TableHead>
				<TableHead>Variation (%)</TableHead>
			  </TableRow>
			</TableHeader>
			<TableBody>
			  <TableRow>
				<TableCell className="font-medium">Atlantique Nord</TableCell>
				<TableCell>15.2</TableCell>
				<TableCell>16.8</TableCell>
				<TableCell>+1.6</TableCell>
				<TableCell>342</TableCell>
				<TableCell>298</TableCell>
				<TableCell className="text-red-500">-12.9%</TableCell>
			  </TableRow>
			  <TableRow>
				<TableCell className="font-medium">Méditerranée</TableCell>
				<TableCell>19.8</TableCell>
				<TableCell>22.1</TableCell>
				<TableCell>+2.3</TableCell>
				<TableCell>315</TableCell>
				<TableCell>256</TableCell>
				<TableCell className="text-red-500">-18.7%</TableCell>
			  </TableRow>
			  <TableRow>
				<TableCell className="font-medium">Mer des Caraïbes</TableCell>
				<TableCell>27.1</TableCell>
				<TableCell>29.4</TableCell>
				<TableCell>+2.3</TableCell>
				<TableCell>487</TableCell>
				<TableCell>392</TableCell>
				<TableCell className="text-red-500">-19.5%</TableCell>
			  </TableRow>
			  <TableRow>
				<TableCell className="font-medium">Pacifique Sud</TableCell>
				<TableCell>24.3</TableCell>
				<TableCell>26.1</TableCell>
				<TableCell>+1.8</TableCell>
				<TableCell>523</TableCell>
				<TableCell>458</TableCell>
				<TableCell className="text-red-500">-12.4%</TableCell>
			  </TableRow>
			  <TableRow>
				<TableCell className="font-medium">Océan Indien</TableCell>
				<TableCell>26.7</TableCell>
				<TableCell>28.9</TableCell>
				<TableCell>+2.2</TableCell>
				<TableCell>498</TableCell>
				<TableCell>412</TableCell>
				<TableCell className="text-red-500">-17.3%</TableCell>
			  </TableRow>
			</TableBody>
		  </Table>
		)
		}		
