import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

var height = 400
@Component({
  selector: 'app-grid-carousel',
  templateUrl: './grid-carousel.component.html',
  styleUrls: ['./grid-carousel.component.scss']
})
export class GridCarouselComponent {
 
  @ViewChild('chart') chartRoot!: ElementRef<SVGSVGElement>;

  width = window.innerWidth / 2;

  
  private container?: d3.Selection<SVGElement, unknown, any, any>; 
  node = d3.range(13).map((d) => {
    let r = 30
    let x = Math.random()
    let y = Math.random()
    let point = {x: x, y: y, r: r}
   
    return point
  })

  constructor() {} 
 
  ngAfterViewInit( ) { 
    const svg = d3.select<SVGElement, unknown>(this.chartRoot.nativeElement); 
    const width = svg.node()?.getBoundingClientRect()?.width || 0;
    this.container = svg.append<SVGElement>('g').attr("transform", `translate(${width/2},${height/2})`); 

    const nodes: any = this.container.selectAll('circle') 
      .data(this.node!) 
      .join('circle') 
      .attr('r', 30)
      .attr("cx", (d: any) => d.x)
      .attr("cy", (d: any) => d.y)
      .attr("fill",(d: any, i) => "url(#image"+i+")")
      .each(function (d, i) {
          d3.select(this).attr('index',i);    
      });


      const simulation = d3 
        .forceSimulation(this.node) 
        .force("x", d3.forceX().strength(0.01))
        .force("y", d3.forceY().strength(0.01))
        .force("collide", d3.forceCollide().radius((d: any)=> d.r*1.5).strength(2).iterations(3))
        .on('tick',tick)

        
      function tick() {
          nodes
              .attr("cx", (d: { x: any; }) => d.x)
              .attr("cy", (d: { y: any; }) => d.y);
        };
      const drag = d3 
        // TODO: find the correct type (should be SVGUseElement, but it doesn't work) 
        .drag<any, any>() 
        .on('start', () => simulation.alpha(1).restart()) 
        .on('drag', ({ x, y }, node) => Object.assign(node, { x, y })) 
        .on('end', ({ x, y }, node) => { 
          Object.assign(node, { 
            x, y, px: x, py: y, 
          }); 
        }); 
      nodes.call(drag).on('click', (_event: MouseEvent, node: any) => { 
        delete node.fx; 
        delete node.fy; 
        simulation.alpha(1).restart(); 
      }); 
   
      nodes 
        .on('mouseover', (d: MouseEvent) => { 
            d3.selectAll('circle').attr('r', (p: any,x: any, ss: any) => {
              const idNode = (d.currentTarget as Element).getAttribute('index'); 
              this.node[p.index].r = 90;
              if(p.index === Number(idNode)) {
                return p.radius = p.r = 90
              } else {
                return p.radius = p.r = 30
              }
            });
            simulation.force("collide", d3.forceCollide().radius((d: any)=> d.r).strength(1).iterations(3))
            simulation.alpha(1).restart()
        }) 
        .on('mouseout', () => { 
          nodes.classed('active', false); 
        }) 
    } 
   
    updateChartSize() { 
      const svg = this.container!.node()!.parentElement; 
      const wrapper = svg?.parentElement; 
      if (!wrapper) { 
        return { width: 0, height: 0 }; 
      } 
      const width = wrapper.offsetWidth || 475; 
      const height = wrapper.offsetHeight || 400; 
   
      svg.setAttribute('width', String(width)); 
      svg.setAttribute('height', String(height)); 
      return { width, height }; 
    } 
}

/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */ 
/* eslint-disable no-param-reassign, no-restricted-syntax, no-continue, no-plusplus */ 

 