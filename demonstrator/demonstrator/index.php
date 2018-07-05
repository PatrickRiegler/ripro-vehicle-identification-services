<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>RiPro - Smart Vehicle Identification Services - Demonstrator</title>

  <meta name="description" content="Source code generated using layoutit.com">
  <meta name="author" content="LayoutIt!">

  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/css/select2.min.css" />
  <link href="css/style.css" rel="stylesheet">

</head>

<body>

<div class="container-fluid">
	<div class="row">
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-12">
					<h1>
						SVIS - Smart Vehicle Identification Services - Demonstrator
					</h1>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3">
					<ul class="nav flex-column nav-pills">
						<li class="nav-item">
							<a id="vin-check" class="nav-link active" href="#">vin - check</a>
						</li>
						<li class="nav-item">
							<a id="vin-decode" class="nav-link" href="#">vin - decode</a>
						</li>
						<li class="nav-item">
							<a id="vin-decodePro" class="nav-link" href="#">vin - decodePro</a>
						</li>
					</ul>
					<div class="alert alert-success alert-dismissable">
						 
						<!-- <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
							×
						</button> -->
						<h4>
							Service Availability Report:
						</h4> <strong>Success!</strong> Service is up and running! 
					</div>
				</div>
				<div id="vin-check-area" class="col-md-9">
					<h3>
						VIN - Check
					</h3>
					<div class="row">
						<div class="col-md-12">
							<form role="form">
								<div class="form-group">
									 
									<label for="vin-check-vin">
										Select a VIN:
									</label>
									<select id="vin-check-vin">
										<option value="WDD2210561A233135">WDD2210561A233135</option>
										<option value="WDC1660241A815681">WDC1660241A815681</option>
									</select>
								</div>
								<button id="vin-check-submit" type="submit" class="btn btn-primary">
									Check VIN
								</button>
							</form>
						</div>
					</div>
					<div id="vin-check-status" class="row hide">
						<div class="col-md-12">
							<div class="alert alert-success alert-dismissable">
								 
								<h4>
									Alert!
								</h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
							</div>
						</div>
					</div>
					<div id="vin-check-result" class="row hide">
						<div class="col-md-12">
						</div>
					</div>
				</div>
				<div id="vin-decode-area" class="col-md-9 hide">
					<h3>
						VIN - Decode
					</h3>
					<div class="row">
						<div class="col-md-12">
							<form role="form">
								<div class="form-group">
									 
									<label for="vin-decode-vin">
										Select a VIN:
									</label>
									<select id="vin-decode-vin">
										<option value="WDD2210561A233135">WDD2210561A233135</option>
										<option value="WDC1660241A815681">WDC1660241A815681</option>
									</select>
								</div>
								<button id="vin-decode-submit" type="submit" class="btn btn-primary">
									Check VIN
								</button>
							</form>
						</div>
					</div>
					<div id="vin-decode-status" class="row hide">
						<div class="col-md-12">
							<div class="alert alert-success alert-dismissable">
								 
								<h4>
									Alert!
								</h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
							</div>
						</div>
					</div>
					<div id="vin-decode-result" class="row hide">
						<div class="col-md-12">
						</div>
					</div>
				</div>
				<div id="vin-decodePro-area" class="col-md-9 hide">
					<h3>
						VIN - DecodePro
					</h3>
					<div class="row">
						<div class="col-md-12">
							<form role="form">
								<div class="form-group">
									 
									<label for="vin-decodePro-vin">
										Select a VIN:
									</label>
									<select id="vin-decodePro-vin">
										<option value="WDD2210561A233135">WDD2210561A233135</option>
										<option value="WDC1660241A815681">WDC1660241A815681</option>
									</select>
								</div>
								<button id="vin-decodePro-submit" type="submit" class="btn btn-primary">
									Check VIN
								</button>
							</form>
						</div>
					</div>
					<div id="vin-decodePro-status" class="row hide">
						<div class="col-md-12">
							<div class="alert alert-success alert-dismissable">
								 
								<h4>
									Alert!
								</h4> <strong>Warning!</strong> Best check yo self, you're not looking too good. <a href="#" class="alert-link">alert link</a>
							</div>
						</div>
					</div>
					<div id="vin-decodePro-result" class="row hide">
						<div class="col-md-12">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.slim.js" integrity="sha256-fNXJFIlca05BIO2Y5zh1xrShK3ME+/lYZ0j+ChxX2DA=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.5/js/select2.min.js"></script>
<script type="text/javascript" src="./require.js"></script>
<script type="text/javascript" src="./lib.js"></script>
<script type="text/javascript" src="./fzs.js"></script>
</body>

</html>
