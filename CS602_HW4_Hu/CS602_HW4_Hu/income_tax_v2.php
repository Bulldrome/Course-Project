<!DOCTYPE html>
<html>
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
            <div class="col-lg-4">
                <h3>Enter Net Income: </h3>
            </div>   
        </div>
        <br>
        <div class="row">
            <div class="col-lg-3">
              <form action="income_tax_v2.php", method="post">
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
        define('TAX_RATES',
         array(
            'Single' => array(
                'Rates' => array(10,15,25,28,33,35,39.6),
                'Ranges' => array(0,9275,37650,91150,190150,413350,415050),
                'MinTax' => array(0,927.50,5183.75,18558.75,46278.75,119934.75,120529.75)
            ),
            'Married_Jointly' => array(
                'Rates' => array(10,15,25,28,33,35,39.6),
                'Ranges' => array(0,18550,75300,151900,231450,413350,466950),
                'MinTax' => array(0,1855.00,10367.50,29517.50,51791.50,111818.50,130578.50)
            ),
            'Married_Separately' => array(
                'Rates' => array(10,15,25,28,33,35,39.6),
                'Ranges' => array(0,9275,37650,75950,115725,206675,233475),
                'MinTax' => array(0,927.50,5183.75,14758.75,25895.75,55909.25,65289.25)
            ),
            'Head_Household' =>array(
                'Rates' => array(10,15,25,28,33,35,39.6),
                'Ranges' => array(0,13250,50400,130150,210800,413350,441000),
                'MinTax' => array(0,1325.00,6897.50,26835.00,49417,116258.50,125936)
            )
            )
            );
        incomeTax();
        //$GLOBAL['tax_single'] = 0; 

        function incomeTax() {
            if (empty($_POST["TaxInput"])){
                $input = 0;
              }else{
                $input = $_POST["TaxInput"];
              }
              echo "With a net taxable income of $" .$input;

            for($i=0;$i<=5;$i++){  //Single tax calculate
                $j= $i+1;
                if ($input >= TAX_RATES['Single']['Ranges'][$i] && $input <= TAX_RATES['Single']['Ranges'][$j]){
                    $GLOBALS['tax_single'] = TAX_RATES['Single']['MinTax'][$i] + ($input -TAX_RATES['Single']['Ranges'][$i])*(TAX_RATES['Single']['Rates'][$i]/100);
                    break;
                }elseif($input > TAX_RATES['Single']['Ranges'][6]){
                    $GLOBALS['tax_single'] = TAX_RATES['Single']['MinTax'][6] + ($input -TAX_RATES['Single']['Ranges'][6])*(TAX_RATES['Single']['Rates'][6]/100);
                }
            } 
            for($i=0;$i<=5;$i++){  //Married_Jointly tax calculate
                $j= $i+1;
                if ($input >= TAX_RATES['Married_Jointly']['Ranges'][$i] && $input <= TAX_RATES['Married_Jointly']['Ranges'][$j] ){
                    $GLOBALS['tax_jointly'] = TAX_RATES['Married_Jointly']['MinTax'][$i] + ($input -TAX_RATES['Married_Jointly']['Ranges'][$i])*(TAX_RATES['Married_Jointly']['Rates'][$i]/100);
                    break;
                }elseif($input > TAX_RATES['Single']['Ranges'][6]){
                    $GLOBALS['tax_jointly'] = TAX_RATES['Married_Jointly']['MinTax'][6] + ($input -TAX_RATES['Married_Jointly']['Ranges'][6])*(TAX_RATES['Married_Jointly']['Rates'][6]/100);
                }
            }
            for($i=0;$i<=5;$i++){  //Married_Separately tax calculate
                $j= $i+1;
                if ($input >= TAX_RATES['Married_Separately']['Ranges'][$i] && $input <= TAX_RATES['Married_Separately']['Ranges'][$j] ){
                    $GLOBALS['tax_separately'] = TAX_RATES['Married_Separately']['MinTax'][$i] + ($input -TAX_RATES['Married_Separately']['Ranges'][$i])*(TAX_RATES['Married_Separately']['Rates'][$i]/100);
                    break;
                }elseif($input > TAX_RATES['Single']['Ranges'][6]){
                    $GLOBALS['tax_separately'] = TAX_RATES['Married_Separately']['MinTax'][6] + ($input -TAX_RATES['Married_Separately']['Ranges'][6])*(TAX_RATES['Married_Separately']['Rates'][6]/100);
                }
            }                
            for($i=0;$i<=5;$i++){  //Head_Household tax calculate
                $j= $i+1;
                if ($input >= TAX_RATES['Head_Household']['Ranges'][$i] && $input <= TAX_RATES['Head_Household']['Ranges'][$j] ){
                    $GLOBALS['tax_household'] = TAX_RATES['Head_Household']['MinTax'][$i] + ($input -TAX_RATES['Head_Household']['Ranges'][$i])*(TAX_RATES['Head_Household']['Rates'][$i]/100);
                    break;
                }elseif($input > TAX_RATES['Single']['Ranges'][6]){
                    $GLOBALS['tax_household'] = TAX_RATES['Head_Household']['MinTax'][6] + ($input -TAX_RATES['Head_Household']['Ranges'][6])*(TAX_RATES['Head_Household']['Rates'][6]/100);
                }
            }
            echo '<br>';
        }
        ?>
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
                    <td><?php echo '$' .$GLOBALS['tax_single'] ?></td>
                </tr>
                <tr>
                    <td>Married Filing Jointly</td>
                    <td><?php echo '$' .$GLOBALS['tax_jointly'] ?></td>
                </tr>
                <tr>
                    <td>Married Filing Separately</td>
                    <td><?php echo '$' .$GLOBALS['tax_separately'] ?></td>
                </tr>
                <tr>
                    <td>Head of Household</td>
                    <td><?php echo '$' .$GLOBALS['tax_household'] ?></td>
                </tr>
                </tbody>
            </table> 
     


        <hr>
        <h3>2016 Tax Table</h3>
        <?php

        //Single tax table 
        echo "<br><p>Single</p>";
        echo '<div class="table-responsive">' ;
        echo '<table class="table table-striped">';
        echo '<thead>
            <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
            </tr>
            </thead>';
        echo '<tbody>';
        $i=0;
        foreach (TAX_RATES['Single']['Ranges'] as $range1){
            if ($i==6){
                echo "<tr>";
                echo "<td>$$range1 or more</td>";
                $rate0 = TAX_RATES['Single']['Rates'][$i];
                $mintax0 = TAX_RATES['Single']['MinTax'][$j];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                echo "</tr>";                    
            }elseif($i==0){
                $j = $i+1;
                $range2 = TAX_RATES['Single']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Single']['Rates'][$i];
                echo "<td>$rate0%</td>";
                $i++;
                echo "</tr>";
            }
            else{
                $j = $i+1;
                $range2 = TAX_RATES['Single']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Single']['Rates'][$i];
                $mintax0 = TAX_RATES['Single']['MinTax'][$i];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                $i++;
                echo "</tr>";
            }
        }
        echo '</tbody>';
        echo '</table>';
        echo '</div>';

        //Married_Jointly table 
        echo "<br><p>Married_Jointly</p>";
        echo '<div class="table-responsive">' ;
        echo '<table class="table table-striped">';
        echo '<thead>
            <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
            </tr>
            </thead>';
        echo '<tbody>';
        $i=0;
        foreach (TAX_RATES['Married_Jointly']['Ranges'] as $range1){
            if ($i==6){
                echo "<tr>";
                echo "<td>$$range1 or more</td>";
                $rate0 = TAX_RATES['Married_Jointly']['Rates'][$i];
                $mintax0 = TAX_RATES['Married_Jointly']['MinTax'][$j];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                echo "</tr>";                    
            }elseif($i==0){
                $j = $i+1;
                $range2 = TAX_RATES['Married_Jointly']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Married_Jointly']['Rates'][$i];
                echo "<td>$rate0%</td>";
                $i++;
                echo "</tr>";
            }
            else{
                $j = $i+1;
                $range2 = TAX_RATES['Married_Jointly']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Married_Jointly']['Rates'][$i];
                $mintax0 = TAX_RATES['Married_Jointly']['MinTax'][$i];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                $i++;
                echo "</tr>";
            }
        }
        echo '</tbody>';
        echo '</table>';
        echo '</div>';

        //Married_Separately tax table 
        echo "<br><p>Married_Separately</p>";
        echo '<div class="table-responsive">' ;
        echo '<table class="table table-striped">';
        echo '<thead>
            <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
            </tr>
            </thead>';
        echo '<tbody>';
        $i=0;
        foreach (TAX_RATES['Married_Separately']['Ranges'] as $range1){
            if ($i==6){
                echo "<tr>";
                echo "<td>$$range1 or more</td>";
                $rate0 = TAX_RATES['Married_Separately']['Rates'][$i];
                $mintax0 = TAX_RATES['Married_Separately']['MinTax'][$j];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                echo "</tr>";                    
            }elseif($i==0){
                $j = $i+1;
                $range2 = TAX_RATES['Married_Separately']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Married_Separately']['Rates'][$i];
                echo "<td>$rate0%</td>";
                $i++;
                echo "</tr>";
            }
            else{
                $j = $i+1;
                $range2 = TAX_RATES['Married_Separately']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Married_Separately']['Rates'][$i];
                $mintax0 = TAX_RATES['Married_Separately']['MinTax'][$i];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                $i++;
                echo "</tr>";
            }
        }
        echo '</tbody>';
        echo '</table>';
        echo '</div>';

        //Head_Household table 
        echo "<br><p>Head_Household</p>";
        echo '<div class="table-responsive">' ;
        echo '<table class="table table-striped">';
        echo '<thead>
            <tr>
            <th>Taxable Income</th>
            <th>Tax Rate</th>
            </tr>
            </thead>';
        echo '<tbody>';
        $i=0;
        foreach (TAX_RATES['Head_Household']['Ranges'] as $range1){
            if ($i==6){
                echo "<tr>";
                echo "<td>$$range1 or more</td>";
                $rate0 = TAX_RATES['Head_Household']['Rates'][$i];
                $mintax0 = TAX_RATES['Head_Household']['MinTax'][$j];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                echo "</tr>";                    
            }elseif($i==0){
                $j = $i+1;
                $range2 = TAX_RATES['Head_Household']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Head_Household']['Rates'][$i];
                echo "<td>$rate0%</td>";
                $i++;
                echo "</tr>";
            }
            else{
                $j = $i+1;
                $range2 = TAX_RATES['Head_Household']['Ranges'][$j];
                echo "<tr>";
                echo "<td>$$range1 -  $$range2</td>";
                $rate0 = TAX_RATES['Head_Household']['Rates'][$i];
                $mintax0 = TAX_RATES['Head_Household']['MinTax'][$i];
                echo "<td>$$mintax0 plus $rate0% of the amount over $$range1</td>";
                $i++;
                echo "</tr>";
            }
        }
        echo '</tbody>';
        echo '</table>';
        echo '</div>';
        ?>

    </body>
</html>
      