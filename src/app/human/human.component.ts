
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import * as humanConstants from './human.constants';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Pathsdetails } from './human.interface';

@Component({
  selector: 'app-human',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './human.component.html',
  styleUrls: ['./human.component.css']
})
export class HumanComponent implements OnInit {
  pathFront = humanConstants.pathFront;
  pathBack = humanConstants.pathBack


  @ViewChild('svgFrontContainer', { static: true })
  svgFrontContainer!: ElementRef;

  @ViewChild('svgBackContainer', { static: true })
  svgBackContainer!: ElementRef;
  svgFront!: d3.Selection<any, unknown, null, undefined>;
  svgBack!: d3.Selection<any, unknown, null, undefined>;
  @ViewChild('bodyPartTooltip')
  bodyPartTooltip: ElementRef<HTMLDivElement> | undefined;
  hoverDetails = '';
  bodyPartTooltipPositioning: { [position: string]: number | string; } | undefined;




  ngOnInit(): void {
    this.renderFrontSvg();
    this.renderBackSvg()
  }

  renderFrontSvg() {
    this.svgFront = d3.select(this.svgFrontContainer.nativeElement);
    this.svgFront
      .selectAll('path')
      .data(this.pathFront)
      .enter()
      .append('path')
      .attr('d', (path: Pathsdetails) => path.d)
      .attr('id', (path: Pathsdetails) => path.id)
      .attr('stroke', (path: Pathsdetails) => path.stroke)
      .attr('fill', (path: Pathsdetails) => path.fill)
      .on('mouseenter', (event: MouseEvent, path: Pathsdetails) => {
        this.hoverDetails = path.id;
        d3.select(`#${path.id}`).attr('fill', '#215e4a');
        this.bodyPartTooltipPositioning = {
          'left.px': event.pageX + 15,
          'top.px': event.pageY - 28,
        };
      })
      .on('mouseleave', (event: MouseEvent, path: Pathsdetails) => {
        this.hoverDetails = path.id;
        d3.select(`#${path.id}`).attr('fill', path.fill);
      });
  }

  renderBackSvg() {
    this.svgBack = d3.select(this.svgBackContainer.nativeElement);
    this.svgBack
      .selectAll('path')
      .data(this.pathBack)
      .enter()
      .append('path')
      .attr('d', (path: Pathsdetails) => path.d)
      .attr('id', (path: Pathsdetails) => path.id)
      .attr('stroke', (path: Pathsdetails) => path.stroke)
      .attr('stroke-width', 1)
      .attr('fill', (path: Pathsdetails) => path.fill)
      .on('mouseenter', (event: MouseEvent, path: Pathsdetails) => {
        this.hoverDetails = path.id;
        d3.select(`#${path.id}`).attr('fill', '#215e4a');
        this.bodyPartTooltipPositioning = {
          'left.px': event.pageX + 15,
          'top.px': event.pageY - 28,
        };
      })
      .on('mouseleave', (event: MouseEvent, path: Pathsdetails) => {
        this.hoverDetails = path.id;
        d3.select(`#${path.id}`).attr('fill', path.fill);
      });

  }
}