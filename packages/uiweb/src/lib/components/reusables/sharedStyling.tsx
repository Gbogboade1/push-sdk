import styled from "styled-components";


type SpanStyleProps = {
    alignSelf?:string;
    background?:string;
    borderRadius?:string;
    bottom?:string;
    flex?:string;
    fontSize?:string;
    fontWeight?:string;
    left?:string;
    letterSpacing?:string;
    lineHeight?:string;
    margin?:string;
    padding?:string;
    position?:string;
    textAlign?:string;
    right?:string;
    textTransform?:string;
    zIndex?:string;
    top?:string;
    maxWidth?:string;
    cursor?:string;
  };

export const Span = styled.span<SpanStyleProps>`
  align-self: ${(props) => props.alignSelf || "auto"};
  background: ${(props) => props.background || "transparent"};
  border-radius: ${(props) => props.borderRadius || "initial"};
  bottom: ${(props) => props.bottom || "auto"};
  color: ${(props) => props.color || "inherit"};
  flex: ${(props) => props.flex || "initial"};
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: ${(props) => props.fontWeight || "300"};
  left: ${(props) => props.left || "auto"};
  letter-spacing: ${(props) => props.letterSpacing || "inherit"};
  line-height: ${(props) => props.lineHeight || "initial"};
   cursor: ${(props) => props.cursor || "default"};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  position: ${(props) => props.position || "static"};
  right: ${(props) => props.right || "auto"};
  text-align: ${(props) => props.textAlign || "center"};
  text-transform: ${(props) => props.textTransform || "inherit"};
  top: ${(props) => props.top || "auto"};
  z-index: ${(props) => props.zIndex || "auto"};
  max-width: ${(props) => props.maxWidth || "initial"};
`

type SectionStyleProps = {
    flexDirection?: string;
    gap?: string;
    alignItems?: string;
    alignSelf?:string;
    minHeight?:string;
    margin?:string;
    gradient?:string;
    position?:string;
    padding?:string;
    overflow?:string;
    background?:string;
    justifyContent?:string;
    maxHeight?:string;
    height?:string;
    width?:string;
    right?:string;
    bottom?:string;
    top?:string;
    left?:string;
  };
  
export const Section = styled.div<SectionStyleProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  gap: ${(props) => props.gap || '0px'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-self: ${(props) => props.alignSelf || 'stretch'};
  margin: ${(props) => props.margin || '0px'};
  min-height: ${(props) => props.minHeight || 'auto'};
  max-height: ${(props) => props.maxHeight || 'auto'};
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  overflow: ${(props) => props.overflow || 'initial'};
  padding: ${(props) => props.padding || '0px'};
  position: ${(props) => props.position || 'relative'};
  background: ${(props) => props.gradient ? props.gradient : props.background ? props.background : 'transparent' || 'transparent'};
  right: ${(props) => props.right || 'auto'};
  top: ${(props) => props.top || 'auto'};
  bottom: ${(props) => props.bottom || 'auto'};
  left: ${(props) => props.left || 'auto'};
`;
