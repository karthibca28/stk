import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dynamic-pdf',
  templateUrl: './dynamic-pdf.component.html',
  styleUrls: ['./dynamic-pdf.component.scss']
})
export class DynamicPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  public convetToPDF()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    pdf.save('Report.pdf'); // Generated PDF
  });
  }

}
