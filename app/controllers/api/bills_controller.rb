class Api::BillsController < ApplicationController
  def create
    @bill = Bill.new(bill_params)
    if @bill.make_records(params[:bill_shares])
      render :show
    else
      render json: @bill.errors.full_messages, status: 422
    end
  end

  def index
    @bills = current_user.bills
    # TODO includes bill_shares and/or users here?
    render :index
  end

  def show
    @bill = Bill.find(params[:id])
    if @bill.user_ids.include?(current_user.id)
      render :show
    else
      render json: ["Unauthorized to access this bill"], status: 401
    end
  end

  def update
    @bill = Bill.find(params[:id])
    if @bill.user_ids.include?(current_user.id) == false
      render json: ["Unauthorized to access this bill"], status: 401
    elsif @bill.update_records(params[:bill_shares], bill_params)
      render :show
    else
      render json: ["Could not perform action"], status: 422
    end
  end

  def destroy
    @bill = Bill.find(params[:id])
    if @bill
      @bill.destroy
      render :show
    else
      render json: @bill.errors.full_messages, status: 422
    end
  end

  private
  def bill_params
    params.require(:bill).permit(:category, :description, :total, :date, :notes)
  end
end
