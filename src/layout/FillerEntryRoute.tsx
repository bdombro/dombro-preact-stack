import { h } from 'preact'

import qs from '~/lib/queryStrings'
import {PageMetaCtx, RouteType} from '~/lib/router'

import PaddedPage from './components/PaddedPage'
import Section from './components/Section'

export default function FillerEntryFactory({ route }: { route: RouteType }) {
	const {id} = qs.parse<Record<string,string>>()
	PageMetaCtx.set({ title: id })
	return <PaddedPage>
		<Section header1={id} backButton={route.hasBack}>
			<p>Nancy was a mighty fine person.</p>
		</Section>
		<Section>
			<p>
				1<br /><br /><br /><br /><br />2
				<br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
			</p>
		</Section>
		<Section>
			<p>
				1<br /><br /><br /><br /><br />2
				<br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
			</p>
		</Section>
		<Section>
			<p>
				1<br /><br /><br /><br /><br />2
				<br /><br /><br /><br /><br />3<br /><br /><br /><br /><br />4
			</p>
		</Section>
	</PaddedPage>
}