import {h} from 'preact'

import { ArrowL } from '~/lib/icons'
import styled from '~/lib/styled'

export default function BackButton() {
	return <BackButtonDiv>
		<BackButtonA title="Go Back" href="#stack-back">
			<ArrowL size={18} />
		</BackButtonA>
	</BackButtonDiv>
}
const BackButtonDiv = styled.div`
	:root
		position: relative
		display: inline-block
		width: 40px
		height: 40px
		margin-top: -40px
		top: 12px
		left: -10px
		background: var(--gray2)
		border-radius: 30px
`
const BackButtonA = styled.a`
	:root
		position: fixed
		display: block
		top: calc( var(--content-inner-top) + 21px )
		left: calc( var(--content-inner-left) + 10px )
		color: var(--gray7)
		border-radius: 30px
		margin-right: 4px
		height: 40px
		width: 40px
		background: var(--gray3)
	:root
		display: block
	:root:hover
		background: var(--gray4)
	:root:active
		transform: translateY(2px)
	:root>svg
		position: relative
		top: 7px
		left: 10px
`