<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
    </head>
    <body>
        <h1>Income Tax Calculator</h1>
        <br>

        <!-- Optional JavaScript -->
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
        
      

        <div class="row">
            <div class="col-lg-3">
                <h3>Your Net Income: </h3>
            </div>   
        </div>
        <br>
        <div class="row">
            <div class="col-lg-3">
              <form action="income_tax_v1.php", method="post">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Taxable Income" name="TaxInput">
                <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </span>
              </div> 
              </form>
            </div>
        </div>
        <br>

        <?php
        //Initialize the Userinput = 0
        if (empty($_POST["TaxInput"])){
          $GLOBALS['input'] = 0;
        }else{
          $GLOBALS['input'] = $_POST["TaxInput"];
        }
        echo "With a net taxable income of $" .$GLOBALS['input'];


        function incomeTaxSingle() {
          if ($GLOBALS['input']>=0 && $GLOBALS['input']<=9275) {      
          $SingleTax = $GLOBALS['input'] * 0.1;
          }      
          elseif ($GLOBALS['input'] >=9276 && $GLOBALS['input'] <= 37650) {      
          $SingleTax = 927.5 + 0.15*($GLOBALS['input'] - 9275);      
          }                
          elseif ($GLOBALS['input'] >=37651 && $GLOBALS['input'] <=91150) {
          $SingleTax = 5183.75 + 0.25*($GLOBALS['input'] - 37650);
          }      
          elseif ($GLOBALS['input'] >=91151 && $GLOBALS['input'] <=190150) {
          $SingleTax = 18558.75 + 0.28*($GLOBALS['input'] - 91150);
          }     
          elseif ($GLOBALS['input'] >=190151 && $GLOBALS['input'] <=413350) {
          $SingleTax = 46278.75 + 0.33*($GLOBALS['input'] - 190150);
          }      
          elseif ($GLOBALS['input'] >=413351 && $GLOBALS['input'] <=415050) {
          $SingleTax = 119934.75 + 0.35*($GLOBALS['input'] - 413350);
          }      
          elseif ($GLOBALS['input'] >=415051) {
          $SingleTax = 120529.75 + 0.396*($GLOBALS['input'] - 415050);
          }
          return $SingleTax;       
        }
          
        function incomeTaxMarriedJointly() {            
          if ($GLOBALS['input']>=0 && $GLOBALS['input']<=18550) {      
          $JointlyTax = $GLOBALS['input'] * 0.1;      
          }      
          elseif ($GLOBALS['input'] >=18551 && $GLOBALS['input'] <= 75300) {     
          $JointlyTax = 1855 + 0.15*($GLOBALS['input'] - 18550);    
          }  
          elseif ($GLOBALS['input'] >=75301 && $GLOBALS['input'] <=151900) {
          $JointlyTax = 10367.5 + 0.25*($GLOBALS['input'] - 75300);
          } 
          elseif ($GLOBALS['input'] >=151901 && $GLOBALS['input'] <=231450) {
          $JointlyTax = 29517.5 + 0.28*($GLOBALS['input'] - 151900);
          }
          elseif ($GLOBALS['input'] >=231451 && $GLOBALS['input'] <=413350) {
          $JointlyTax = 51791.5 + 0.33*($GLOBALS['input'] - 231451);
          }  
          elseif ($GLOBALS['input'] >=413351 && $GLOBALS['input'] <=466950) {
          $JointlyTax = 111818.5 + 0.35*($GLOBALS['input'] - 413350);
          }
          elseif ($GLOBALS['input'] >=466951) {
          $JointlyTax = 130578.5 + 0.396*($GLOBALS['input'] - 466950);
          }
          return $JointlyTax;      
        }
              
        function incomeTaxMarriedSeparately() {  
          if ($GLOBALS['input']>=0 && $GLOBALS['input']<=9275) {  
          $MarriedSeparatelyTax = $GLOBALS['input'] * 0.1;      
          }      
          elseif ($GLOBALS['input'] >=9276 && $GLOBALS['input'] <= 37650) {      
          $MarriedSeparatelyTax = 927.5 + 0.15*($GLOBALS['input'] - 9275);      
          }                 
          elseif ($GLOBALS['input'] >=37651 && $GLOBALS['input'] <=75950) {
          $MarriedSeparatelyTax = 5183.75 + 0.25*($GLOBALS['input'] - 37650);
          } 
          elseif ($GLOBALS['input'] >=75951 && $GLOBALS['input'] <=115725) {
          $MarriedSeparatelyTax = 14758.75 + 0.28*($GLOBALS['input'] - 75950);
          }
          elseif ($GLOBALS['input'] >=115726 && $GLOBALS['input'] <=206675) {
          $MarriedSeparatelyTax = 25895.75 + 0.33*($GLOBALS['input'] - 115720);
          } 
          elseif ($GLOBALS['input'] >=206676 && $GLOBALS['input'] <=233475) {
          $MarriedSeparatelyTax = 55909.25 + 0.35*($GLOBALS['input'] - 206675);
          } 
          elseif ($GLOBALS['input'] >=233476) {
          $MarriedSeparatelyTax = 65289.25 + 0.396*($GLOBALS['input'] - 233475);
          }
          return $MarriedSeparatelyTax;   
        }
            
        function incomeTaxHeadOfHousehold() {
          if ($GLOBALS['input']>=0 && $GLOBALS['input']<=13250) {  
          $HouseholdTax = $GLOBALS['input'] * 0.1;
          }
          elseif ($GLOBALS['input'] >=13251 && $GLOBALS['input'] <= 50400) {
          $HouseholdTax = 1325 + 0.15*($GLOBALS['input'] - 13250);
          }
          elseif ($GLOBALS['input'] >=50401 && $GLOBALS['input'] <=130150) {
          $HouseholdTax = 6897.5 + 0.25*($GLOBALS['input'] - 50400);
          }
          elseif ($GLOBALS['input'] >=130151 && $GLOBALS['input'] <=210800) {
          $HouseholdTax = 26835 + 0.28*($GLOBALS['input'] - 130150);
          }
          elseif ($GLOBALS['input'] >=210801 && $GLOBALS['input'] <=413350) {
          $HouseholdTax = 49417 + 0.33*($GLOBALS['input'] - 210800);
          }
          elseif ($GLOBALS['input'] >=413351 && $GLOBALS['input'] <=441000) {
          $HouseholdTax = 116258.5 + 0.35*($GLOBALS['input'] - 413350);
          }
          elseif ($GLOBALS['input'] >=441001) {
          $HouseholdTax = 125936 + 0.396*($GLOBALS['input'] - 441000);
          }
          return $HouseholdTax;  
        }

        $singletax = incomeTaxSingle();
        $married_jointlytax = incomeTaxMarriedJointly();
        $married_separatelytax = incomeTaxMarriedSeparately();
        $householdtax = incomeTaxHeadOfHousehold();
      
        ?>
    <!--  -->

        <br>
        <br>
        <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Tax</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Single</td>
                  <td><?php echo '$' .$singletax ?></td>
                </tr>
                <tr>
                  <td>Married Filing Jointly</td>
                  <td><?php echo '$' .$married_jointlytax ?></td>
                </tr>
                <tr>
                  <td>Married Filing Separately</td>
                  <td><?php echo '$' .$married_separatelytax ?></td>
                </tr>
                <tr>
                  <td>Head of Household</td>
                  <td><?php echo '$' .$householdtax ?></td>
                </tr>
              </tbody>
            </table>
          </div>
    </body>
</html>