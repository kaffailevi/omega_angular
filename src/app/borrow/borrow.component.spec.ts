import {BorrowComponent} from "./borrow.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";


describe('BorrowComponent',() =>{
  let component: BorrowComponent;
  let fixture: ComponentFixture<BorrowComponent>;

  beforeEach(async ()=>{
    await TestBed.configureTestingModule({
      declarations: [BorrowComponent]
    })
      .compileComponents();

    fixture=TestBed.createComponent(BorrowComponent);
    component=fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',()=>{
    expect(component).toBeTruthy();
  })
})
